const handleVideo = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const videoCategory = data.data;
    // console.log(videoCategory);
    const tabContainer = document.getElementById('all-tab-container');
    videoCategory.forEach((category) =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadVideo('${category.category_id}')" class="tab">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });
}

const handleLoadVideo = async(categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const eachTabData = data.data;
    console.log(eachTabData);
    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';
    eachTabData.forEach((videos) => {
    const div = document.createElement('div');
    div.innerHTML=`
    <div class="shadow-xl"></div>
        <figure><img class="w-72 h-44" src=${videos?.thumbnail}/></figure>
        <div class="grid grid-cols-2 mt-2 p-2">
            <div class="w-1/4"><img class="rounded-full w-10 h-10" src=${videos?.authors[0]?.profile_picture}/></div>
            
            <div class="w-full">
                <h2 class="font-semibold">${videos?.title}</h2>
                <p>${videos?.authors[0]?.profile_name}</p>
                <p>${videos?.authors[0]?.verified}</p>
                <p>${videos?.others?.views}</p>
            </div>

          
        </div>
    </div>
    `;
    cardContainer.appendChild(div);    

    }); 
}
handleVideo();
// handleLoadVideo();