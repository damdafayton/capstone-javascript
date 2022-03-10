import { requestInvolvement } from './api';

const addLike=(coinId)=>{
    console.log('like added',requestInvolvement.post('likes',{item_id:coinId}));

}
const getLikes=async(coinId)=>{
    var res=await requestInvolvement.get(`likes?item_id=${coinId}`);
   var result= res.json();
    return result;
}

// const addLikeListner=()=>{
//     const likeIcons = document.querySelectorAll('.likeBtn');
//     likeIcons.forEach(icon=>icon.addEventListener('click',()=>{
//         addLike(icon.id);
//         icon.querySelector('.fa-heart').classList.add('liked');
//     }))
// }

const addLikeBtnListner=(coinId,btn)=>{
    btn.addEventListener('click',()=>{
        addLike(coinId);
       btn.querySelector('.fa-heart').classList.add('liked'); 
    })
   
}

// const addLikesToList=async()=>{
//     const likeIcons = document.querySelectorAll('.likeBtn');
//     for(const icon of likeIcons){
//         var myLikes= await getLikes(icon.id);
//         console.log(myLikes)
//         icon.querySelector('p').innerHTML=myLikes.length;
//     }
// }

const addCoinLikes=async(coinId,likeIcon)=>{
        var myLikes= await getLikes(coinId);
        var likess=myLikes.filter(item=>item.item_id===coinId)[0];
        console.log(likess?likess.likes:0);
        likeIcon.querySelector('p').innerHTML=`${likess?likess.likes:0}`;
}

export {addLike, getLikes,addCoinLikes,addLikeBtnListner};