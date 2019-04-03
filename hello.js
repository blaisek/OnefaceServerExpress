const hello = () => {
    console.log('hello world')
}

const hello2 = () => {
    console.log('hello cruel world');
    
}

module.exports = {

    helloworld : hello,
    hello : hello2,

    obj: {
        val1:'abc',
        val2: 'def',
        val3: 'ghi'

    }

}