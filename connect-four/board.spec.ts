import { test, expect } from 'bun:test'
import { Board } from '.'

test("Can create a board and move", () => {
  const board = new Board()

  board.move(0, 1)
  board.move(2, 2)
  board.move(1, 1)
  board.move(4, 2)
  board.move(4, 1)
  board.move(3, 2)

  expect(board.cells).toEqual([
     [0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0],
     [0,0,0,0,1,0,0],
     [1,1,2,2,2,0,0],
  ])

  board.move(0, 1)
  let winner = board.move(0, 1)
  expect(winner).toBe(0)
  board.move(0, 1)
  winner = board.move(0, 1)
  expect(winner).toBe(1)
})

test("Player wins horizontally", () => {
  const board = new Board()

  board.move(0, 1)
  board.move(1, 1)
  board.move(2, 1)
  let winner = board.move(3, 1)
  expect(winner).toBe(1)
})

test("Player wins vertically", () => {
  const board = new Board()

  board.move(0, 1)
  board.move(0, 1)
  board.move(0, 1)
  let winner = board.move(0, 1)
  expect(winner).toBe(1)
})

test("Player wins diagonally", () => {
  const board = new Board()

  board.move(0, 1)
  board.move(1, 2)
  board.move(1, 1)
  board.move(2, 2)
  let noWinner = board.move(2, 2)
  expect(noWinner).toBe(0)
  board.move(2, 1)
  board.move(3, 2)
  board.move(3, 2)
  board.move(3, 2)
  let winner = board.move(3, 1)
  
  expect(winner).toBe(1)
})

test("Player wins antidiagonally", () => {
  const board = new Board()
  board.move(6, 1)
  board.move(5, 2)
  board.move(5, 1)
  let noWinner = board.move(4, 2)
  expect(noWinner).toBe(0)
  board.move(4, 2)
  board.move(4, 1)
  noWinner = board.move(3, 2)
  expect(noWinner).toBe(0)
  board.move(3, 2)
  board.move(3, 2)
  let winner = board.move(3, 1)

  expect(winner).toBe(1)
})