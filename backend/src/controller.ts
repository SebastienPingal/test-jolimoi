import { Request, Response } from 'express'
import { decimalToRoman } from './helper'

export const convertDecimalToRomanSSE = (req: Request, res: Response) => {
  const decimal = parseInt(req.query.decimal as string)

  // set response headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  })

  if (typeof decimal !== 'number' || !Number.isInteger(decimal)) {
    res.write('event: error\n')
    res.write('data: decimal must be an integer\n\n')
    res.end()
    return
  }

  if (decimal <= 0 || decimal > 100) {
    res.write('event: error\n')
    res.write('data: decimal must be between 1 and 100\n\n')
    res.end()
    return
  }

  const roman = decimalToRoman(decimal)

  res.write('event: result\n')
  res.write(`data: ${roman}\n\n`)
  res.end()
}