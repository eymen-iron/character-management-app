#!/bin/bash

echo "=== Backend Setup ==="
cd backend
pnpm install
npx prisma migrate dev --name init 2>/dev/null || npx prisma migrate deploy
npx prisma db seed
pnpm start:dev &
BACKEND_PID=$!

echo "Waiting for backend on port 4000..."
until curl -s http://localhost:4000/graphql -X POST -H "Content-Type: application/json" -d '{"query":"{ __typename }"}' > /dev/null 2>&1; do
  sleep 1
done
echo "Backend is ready!"

echo ""
echo "=== Frontend Setup ==="
cd ../frontend
pnpm install
pnpm dev &
FRONTEND_PID=$!

echo ""
echo "Backend:  http://localhost:4000/graphql"
echo "Frontend: http://localhost:3000"
echo "Press Ctrl+C to stop both."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait
