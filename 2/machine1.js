let fs = require('fs')

// Get "real" arguments
let [a, b, ...args] = process.argv

let input = args[0]
// pc stands for 'program counter', the address of the instruction that is
// to be executed next.
let pc = args[1] || 0

if (!input) {
	throw new Error('no input')
}

let memory = fs
	.readFileSync(input, 'utf8')
	.split(/\s+/)
	.filter(Boolean)
	.map(word => Number(word))

let HLT = 0
let ADD = 1
let SUB = 2
let MUL = 3
let DIV = 4

while (true) {
	let instruction = memory[pc++]
	if (instruction === undefined) {
		throw new Error('no access')
	}

	switch (instruction) {
		case HLT: {
			let input = memory[pc++]
			console.log(memory[input])
			return
		}
		case ADD: {
			let targetAddress = memory[pc++]
			let lhs1Address = memory[pc++]
			let rhs1Address = memory[pc++]
			memory[targetAddress] = memory[lhs1Address] + memory[rhs1Address]
			break
		}
		case DIV: {
			let targetAddress = memory[pc++]
			let lhs1Address = memory[pc++]
			let rhs1Address = memory[pc++]
			memory[targetAddress] = memory[lhs1Address] / memory[rhs1Address]
			break
		}
		case SUB:
		case MUL:
			throw new Error('TODO')
		default:
			throw new Error('illegal instruction')
	}
}
