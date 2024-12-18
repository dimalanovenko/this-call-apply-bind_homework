// let sum = (a, b) => a + b;

// console.log(sum(1, 2));

// let ask = (question, yes, no) => {
//     if (confirm(question)) yes()
//     else no();
// }


// ask("Вы согласны?", () => alert("Вы согласились."), () => alert("Вы отменили выполнение."));

// 1 уровень сложности: Level 1
// Показать собственный пример
// использования this /call /apply /bind 
// на производном примере (не с урока) 

// this
class User {
    #password = '';
    #login = '';

    constructor(id) {
        this.id = id;
    }

    signUp(login, password, confirmPassword) {
        this.#login = login;  
        this.#password = password;  

        if (password === confirmPassword) {
            console.log('Registration completed!');
        } else {
            console.log('Passwords do not match.');
        }

        return this; 
    }

    signIn(login, password) {
        if (login === this.#login && password === this.#password) {
            console.log(`${login}, you are welcome!`);
        } else if (login === this.#login && password !== this.#password) {
            console.log(`${login}, your password is incorrect. Please try again.`);
        } else {
            console.log('Sorry, there is an unknown error. Please try again.');
        }

        return this; 
    }

    logInfo(bio){
        console.group(`${this.#login} info :`)
        console.log(`
            User : ${this.#login}
            Id : ${this.id}
            Bio : ${bio}
            `)
        console.groupEnd()
    }
}


const dimalandy = new User(1)
    .signUp('dimalandy', '12345', '12345')
    .signIn('dimalandy', '12345')
    
const anna2306 = new User(2)
    .signUp('anna2306', '123456', '123456')
    .signIn('anna2306', '123456');

const geratelran = new User(3)
    .signUp('geratelran', '123###', '123###')
    .signIn('geratelran', '123###');

// call

const logUser = function () {
    console.log(this);
}

logUser.call(dimalandy);
logUser.call(anna2306);
logUser.call(geratelran);

// apply

const usersArr = [];

usersArr.push(dimalandy, anna2306, geratelran);

console.log(usersArr);

const ids = usersArr.map(user => user.id);

const min = Math.min.apply(null, ids);
console.log(`Id min value : ${min}`);

const max = Math.max.apply(null, ids);
console.log(`Id max value : ${max}`);

// bind

dimalandy.logInfo(`Bio for dimalandy`);

const logAnnaInfo = dimalandy.logInfo.bind(anna2306, 'Bio for anna2306');
logAnnaInfo();

const logGeratelranInfo = dimalandy.logInfo.bind(geratelran, 'Bio for geratelran');
logGeratelranInfo();









