// @ flow

import { Block } from './Block'
import { Transaction } from './Transaction'

import _ from 'lodash'

export class Chain {
  chain: Block[]
  difficulty: number
  pendingTransactions: Transaction[]
  miningReward: number

  constructor() {
    this.chain = [this.genesis()]
    this.difficulty = 2
    this.pendingTransactions = []
    this.miningReward = 1337
  }

  genesis(): Block {
    return new Block(new Date('1943-04-14T00:00:00'), '0', [])
  }

  latest() {
    return this.chain[this.chain.length - 1]
  }

  chainIsValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const thisBlock = this.chain[i]
      const lastBlock = this.chain[i - 1]

      if (!_.isEqual(thisBlock.hash, thisBlock.calcHash())) {
        return false
      }

      if (!_.isEqual(thisBlock.lastHash, lastBlock.hash)) {
        return false
      }
    }
    return true
  }

  createTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction)
  }

  mine(rewardAddress: string) {
    const block = new Block(
      new Date(),
      this.latest().hash,
      this.pendingTransactions
    )

    block.mine(this.difficulty)
    this.chain.push(block)

    this.pendingTransactions = [
      new Transaction(null, rewardAddress, this.miningReward)
    ]
  }

  getAddressBalance(address: string): number {
    let balance = 0

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address) {
          balance = balance - tx.amount
        }
        if (tx.toAddress === address) {
          balance = balance + tx.amount
        }
      }
    }

    return balance
  }
}
