const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://jasper:${password}@cluster1.gmcixyl.mongodb.net/phonebook?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

mongoose
    .connect(url)
    .then((result) => {
        console.log('connected')

        const person = new Person({
            name: 'Agent 13',
            number: '1234-5678'
        })

        return person.save()
    })
    .then(() => {
        console.log('person saved!')
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))