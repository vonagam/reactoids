getStack = ->=

  stack = ( new Error ).stack

  regexp = ///
  
    \n\s*at\s
    ( \S+ ) # method
    \s
    \(
      ( \S+? ) # file
      (?: 
        :(\d+) # line
        :(\d+) # char
      )
    \)

  ///g

  result = []

  while match = regexp.exec stack

    result.push(

      method: match[ 1 ]
      file: match[ 2 ]
      line: + match[ 3 ]
      char: + match[ 4 ]

    )

  result.splice 0, 1

  result


module.exports = getStack

