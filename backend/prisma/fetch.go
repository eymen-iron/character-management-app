package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

type Origin struct {
	Name string `json:"name"`
}

type Location struct {
	Name string `json:"name"`
}

type APICharacter struct {
	Name     string   `json:"name"`
	Status   string   `json:"status"`
	Gender   string   `json:"gender"`
	Species  string   `json:"species"`
	Image    string   `json:"image"`
	Origin   Origin   `json:"origin"`
	Location Location `json:"location"`
}

type APIResponse struct {
	Info struct {
		Pages int `json:"pages"`
	} `json:"info"`
	Results []APICharacter `json:"results"`
}

type SeedCharacter struct {
	Name        string `json:"name"`
	Status      string `json:"status"`
	Gender      string `json:"gender"`
	Image       string `json:"image"`
	Description string `json:"description"`
}

func mapStatus(s string) string {
	switch s {
	case "Alive":
		return "ALIVE"
	case "Dead":
		return "DEAD"
	default:
		return "UNKNOWN"
	}
}

func mapGender(g string) string {
	switch g {
	case "Male":
		return "MALE"
	case "Female":
		return "FEMALE"
	case "Genderless":
		return "GENDERLESS"
	default:
		return "UNKNOWN"
	}
}

func fetchPage(page int) (*APIResponse, error) {
	url := fmt.Sprintf("https://rickandmortyapi.com/api/character?page=%d", page)

	for attempt := 0; attempt < 5; attempt++ {
		resp, err := http.Get(url)
		if err != nil {
			time.Sleep(time.Duration(attempt+1) * 3 * time.Second)
			continue
		}

		body, err := io.ReadAll(resp.Body)
		resp.Body.Close()
		if err != nil {
			time.Sleep(time.Duration(attempt+1) * 3 * time.Second)
			continue
		}

		if resp.StatusCode != 200 {
			fmt.Printf("  page %d: HTTP %d, waiting %ds...\n", page, resp.StatusCode, (attempt+1)*3)
			time.Sleep(time.Duration(attempt+1) * 3 * time.Second)
			continue
		}

		var result APIResponse
		if err := json.Unmarshal(body, &result); err != nil {
			fmt.Printf("  page %d: parse error, waiting %ds...\n", page, (attempt+1)*3)
			time.Sleep(time.Duration(attempt+1) * 3 * time.Second)
			continue
		}
		return &result, nil
	}
	return nil, fmt.Errorf("page %d: failed after 5 attempts", page)
}

func main() {
	fmt.Println("Fetching page 1...")
	first, err := fetchPage(1)
	if err != nil {
		panic(err)
	}

	totalPages := first.Info.Pages
	fmt.Printf("Total pages: %d\n", totalPages)

	var all []SeedCharacter

	convert := func(chars []APICharacter) {
		for _, c := range chars {
			all = append(all, SeedCharacter{
				Name:        c.Name,
				Status:      mapStatus(c.Status),
				Gender:      mapGender(c.Gender),
				Image:       c.Image,
				Description: fmt.Sprintf("%s from %s. Last seen at %s.", c.Species, c.Origin.Name, c.Location.Name),
			})
		}
	}

	convert(first.Results)

	for page := 2; page <= totalPages; page++ {
		fmt.Printf("Fetching page %d/%d...\n", page, totalPages)
		data, err := fetchPage(page)
		if err != nil {
			panic(err)
		}
		convert(data.Results)
		time.Sleep(200 * time.Millisecond)
	}

	fmt.Printf("Total characters: %d\n", len(all))

	file, err := os.Create("prisma/characters.json")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(all); err != nil {
		panic(err)
	}

	fmt.Println("Saved to prisma/characters.json")
}
