// @flow

import { Chain } from './core/Chain'
import { Transaction } from './core/Transaction'
;(async => {
  const chain = new Chain()

  chain.createTransaction(new Transaction('dummy1', 'dummy2', 10))
  chain.createTransaction(new Transaction('dummy2', 'dummy1', 5))

  chain.mine('myAddress')
  console.log(chain.getAddressBalance('myAddress'))

  chain.createTransaction(new Transaction('myAddress', 'dummy2', 10))
  chain.createTransaction(new Transaction('myAddress', 'dummy1', 5))

  chain.mine('myAddress')
  console.log(chain.getAddressBalance('myAddress'))
})()
