// @flow

import sha256 from 'crypto-js/sha256'

import { Transaction } from './Transaction'

export class Block {
  hash: string
  lastHash: string
  nonce: number
  timestamp: Date
  transactions: Transaction[]

  constructor(timestamp: Date, lastHash: string, transactions: Transaction[]) {
    this.timestamp = timestamp
    this.lastHash = lastHash
    this.nonce = 0
    this.transactions = transactions
    this.hash = this.calcHash()
  }

  calcHash(): string {
    return sha256(
      this.lastHash +
        this.timestamp.toDateString() +
        JSON.stringify(this.transactions) +
        this.nonce
    ).toString()
  }

  mine(difficulty: number) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
    ) {
      this.nonce = this.nonce + 1
      this.hash = this.calcHash()
    }
  }
}
