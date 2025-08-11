function getIndentLevel(str){
  return str?.match(/^\s+/g)?.[0]?.length || 0
}

function parse(md, curIndent = 0) {
   const lines = md.split("\n").filter(Boolean)
   let i = 0
   const tokens = []
  
   while(i < lines.length){
     let node = { val: lines[i], indent: curIndent }
     let j = i + 1
     // we want to see not if the current indentation is 
     // less but if next line is
     let nextIndent = getIndentLevel(lines[j])
      while(j < lines.length && 
         getIndentLevel(lines[j]) > curIndent){
       j++
     }
    
     if(j > i && i + 1 < lines.length){
        node.children = parse(
          lines.slice(i + 1, j).join('\n'), 
          nextIndent
        )
     }
     tokens.push(node)
     i = j
   }

   return tokens
}

const md = `
Hi1
  Hi2
  Hi3
    Hi4
      Hi5
Hi7
    Hi8
      Hi9
    Hi10
      Hi11

`


const test1 = [
  {
    val: "hi1", 
    indent: 0, 
    children: [
      { 
        val: "Hi2", 
        indent: 2, 
        children: [
          { 
            val: 'Hi3', 
            indent: 4, 
            children: [] 
          }
        ] 
      },
      {
        val: "Hi4",
        indent: 2,
        children: [
          {
            val: "Hi5",
            indent: 4,
            children: []
          }
        ]
      }
    ]
  }
]

console.log(JSON.stringify(parse(md), null, 2))