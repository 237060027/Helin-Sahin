const posts = JSON.parse(localStorage.getItem("posts")) || [
    {
        id: 1,
        title: "How to Learn JavaScript",
        category: "JavaScript",
        author: "JohnDoe",
        content: "JavaScript is one of the most important languages for web development...",
        comments: []
    },
    {
        id: 2,
        title: "The Future of Web Development",
        category: "Technology",
        author: "JaneSmith",
        content: "Web development is evolving rapidly with new frameworks and technologies...",
        comments: []
    }
];

let loggedInUser = localStorage.getItem('username');

function displayPosts(postsToDisplay) {
    const postsContainer = document.getElementById('blog-posts');
    postsContainer.innerHTML = '';

    if (postsToDisplay.length === 0) {
        postsContainer.innerHTML = '<p>No posts found.</p>';
        return;
    }

    postsToDisplay.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h4><a href="post.html?id=${post.id}">${post.title}</a></h4>
            <p><strong>Category:</strong> ${post.category}</p>
            <p><strong>Author:</strong> ${post.author}</p>
            <p>${post.content.substring(0, 100)}...</p>
            <div class="comment-section">
                <textarea id="comment-text-${post.id}" placeholder="Add your comment..."></textarea>
                <button onclick="postComment(${post.id})" class="comment-btn">Post Comment</button>
                <div id="comments-${post.id}">
                    ${post.comments.map(comment => `<p><strong>${comment.author}</strong>: ${comment.content}</p>`).join('')}
                </div>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

function postComment(postId) {
    const commentText = document.getElementById(`comment-text-${postId}`).value;
    if (!commentText.trim()) return;

    const post = posts.find(post => post.id === postId);
    const comment = {
        author: loggedInUser || "Anonymous", 
        content: commentText,
    };

    post.comments.push(comment);
    localStorage.setItem('posts', JSON.stringify(posts));

    displayPosts(posts); 
}

function login() {
    const usernameInput = document.getElementById('login-username');
    const username = usernameInput.value.trim();

    if (!username) {
        alert('Please enter a username.');
        return;
    }

    loggedInUser = username;
    localStorage.setItem('username', username);
    alert(`Welcome, ${username}!`);
    displayPosts(posts); 
    window.location.reload(); 
}

function logout() {
    localStorage.removeItem('username'); 
    loggedInUser = null;
    alert('You have logged out.');
    displayPosts(posts); 
    window.location.reload();
}

window.onload = function() {
    displayPosts(posts); 
};
