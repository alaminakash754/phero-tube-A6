const handleVideo = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const videoCategory = data.data;
    const tabContainer = document.getElementById('all-tab-container');
    videoCategory.forEach((category) =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadVideo('${category.category_id}')" class="tab hover:bg-red-500">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    });
}

const handleLoadVideo = async(categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();
    const eachTabData = data.data;
    const noDataContainer = document.getElementById('no-data-container');
    noDataContainer.innerHTML = '';
    
    if(eachTabData.length == 0){
    const div = document.createElement('div')
    div.innerHTML = `
    <div class="grid grid-rows-2 items-center justify-center gap-5 mt-10">
        <img class="ml-28" src="./Icon.png" alt="">
        <h3 class="text-4xl font-bold">Oops!! Sorry, There is no <br> content here</h3>
    </div>
    `;    
    noDataContainer.appendChild(div);
    }

    const cardContainer = document.getElementById('card-container')
    cardContainer.innerHTML = '';

    eachTabData.forEach((videos) => {  
    const seconds = videos.others?.posted_date;
    const postedTime = convertToHoursAndMinutes(seconds);
    const div = document.createElement('div');
    div.innerHTML=`
    <div class="shadow-xl"></div>
        <figure><img class="w-80 h-48" src=${videos?.thumbnail}/></figure>
        <div class="grid grid-cols-1 mt-2">
            <div class="flex gap-5">
                <div>
                    <img class="rounded-full w-12 h-12" src=${videos?.authors[0]?.profile_picture}/>
                </div>
                <div>
                    <h2 class="font-semibold">${videos?.title}</h2>
                    <div class="flex items-center justify-start">
                        <p>${videos?.authors[0]?.profile_name}</p>
                        <p>${videos?.authors[0]?.verified?`<img src="./verification.png">` : ''}</P>
                    </div>
                    <p>${videos?.others?.views} views</p>
                    <p id="seconds" class="text-white bg-black relative bottom-32 lg:left-16 sm:left-40 md:left-[40px] ${seconds === 0 ? 'hidden' : ''} ">${postedTime}</p>
                </div>
            
            
            </div>
                     
        </div>
    </div>
    `;
    cardContainer.appendChild(div);    

    }); 
}

const convertToHoursAndMinutes = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const remainingSecond = (seconds % 3600);
        const minutes = Math.floor(remainingSecond /60);
        if(hours === 0 && minutes ===0){
            return '';
        }
        else{
            return `${hours} hrs ${minutes} min ago`
        }
}

document.getElementById('blog-btn').addEventListener('click', function(){
    location.href='blog.html';
});

handleVideo();
handleLoadVideo("1000");

