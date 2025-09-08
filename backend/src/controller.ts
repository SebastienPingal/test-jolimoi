import { Request, Response } from 'express'
import { decimalToRoman as convert } from './helper'

export const convertDecimalToRoman = (req: Request, res: Response) => {
  const { decimal } = req.body || {}

  if (typeof decimal !== 'number' || !Number.isInteger(decimal)) {
    return res.status(400).json({ error: 'decimal must be an integer' })
  }

  if (decimal <= 0 || decimal > 100) {
    return res.status(400).json({ error: 'decimal must be between 1 and 100' })
  }

  const roman = convert(decimal)

  res.json({ roman })
}