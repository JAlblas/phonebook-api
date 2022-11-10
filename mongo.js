const mongoose = require('mongoose')

if (process.argv.length < 3 || process.argv.length > 5) {
    console.log('Please provide the password, name and number as an argument: node mongo.js <password> <name> <number>')
    console.log('OR')
    console.log('Only provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const password = process.argv[2]
const url = `mongodb+srv://jasper:${password}@cluster1.gmcixyl.mongodb.net/phonebook?retryWrites=true&w=majority`

if (process.argv.length == 3) {
    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')
            Person
                .find({})
                .then(persons => {
                    console.log("Phonebook contents:")
                    persons.forEach(person => {
                        console.log(`${person.name} - ${person.number}`)
                    })
                    mongoose.connection.close()
                })

        })


} else if (process.argv.length == 5) {
    const name = process.argv[3]
    const number = process.argv[4]

    mongoose
        .connect(url)
        .then((result) => {
            console.log('connected')

            const person = new Person({
                name: name,
                number: number
            })

            return person.save()
        })
        .then((person) => {
            console.log(`${person.name} added to the phonebook with number: ${person.number}`)
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))
}



