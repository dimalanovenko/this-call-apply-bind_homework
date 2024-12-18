// Please check: app.js:75



const autentificateMe = {
    "username": "dimalanovenko0",
    "password": "12345678a!"
}

const signIn = async () => {
    try {
        const res = await fetch('http://49.13.31.246:9191/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(autentificateMe)
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data);
            return;
        }

        if (data.token) {
            // Save the JWT to localStorage
            localStorage.setItem('jwtToken', data.token);
            console.log('Login successful. Token saved to localStorage.');
        } else {
            console.log('Login failed:', data.message);
        }

        console.log(data);

    } catch (e) {
        console.log(e);
    }
}

signIn()


const getMe = async () => {
    const jwt = localStorage.getItem('jwtToken') || '';

    try {
        const res = await fetch('http://49.13.31.246:9191/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": jwt
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data);
            return null;
        }

        console.log(data);

        return data;

    } catch (e) {
        console.log(e);
    }
}

// applying call to my request

getMe.call(document)
    .then((data) => {
        if (data) {
            console.log("getMe() is succesfully complete! Profile data is displayed in html.");
            document.getElementById('name').textContent = data.fullName;
            document.getElementById('bio').textContent = data.bio;
            document.querySelector('.pCard_up').style.backgroundImage = `url(${data.avatar})`;
            document.getElementById('posts_count').textContent = data.posts_count;
            document.getElementById('followers').textContent = data.followers;
            document.getElementById('following').textContent = data.following;
        }
    })

const getAllPosts = async () => {
    const jwt = localStorage.getItem('jwtToken') || '';

    try {
        const userId = '67535eb276d087dd317cf039';
        const res = await fetch(`http://49.13.31.246:9191/posts?user_id=${userId}`, { // Added query parameter to URL
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": jwt
            }
        });

        const data = await res.json();

        if (!res.ok) {
            console.log(data);
            return null;
        }

        console.log(data);

        return data;

    } catch (e) {
        console.log(e);
        return null;
    }
}

getAllPosts()
    .then((data) => {
        if (data) {
            data.forEach(post => {
                const markup = `
                    <li>${post.title}</li>
                    <li>${post.description}</li>
                    `;

                document.querySelector('#postsList').insertAdjacentHTML('beforeend', markup);
            });
        }
    });


// const deletePost = async () => {
//     const jwt = localStorage.getItem('jwtToken') || '';

//     try {
//         const PostId = '675ee2bf76d087dd317cf7a3';
//         const res = await fetch(`http://49.13.31.246:9191/posts?user_id=${userId}`, { // Added query parameter to URL
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 "x-access-token": jwt
//             }
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             console.log(data);
//             return null;
//         }

//         console.log('the post deleted succesfully!');

//         return data;

//     } catch (e) {
//         console.log(e);
//         return null;
//     }
// }
// deletePost()

