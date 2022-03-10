import { requestInvolvement } from './api';

const addLike = (coinId) => requestInvolvement.post('likes', { item_id: coinId });
const getLikes = async (coinId) => {
  const res = await requestInvolvement.get(`likes?item_id=${coinId}`);
  const result = res.json();
  return result;
};

// const addLikeBtnListner=(coinId,btn)=>{
//     console.log(btn);
//      btn.addEventListener('click',async()=>{

//       var res = await addLike(coinId);
//       console.log(res);
//        btn.querySelector('.fa-heart').classList.add('liked');
//     })

// }

// const addLikesToList=async()=>{
//     const likeIcons = document.querySelectorAll('.likeBtn');
//     for(const icon of likeIcons){
//         var myLikes= await getLikes(icon.id);
//         console.log(myLikes)
//         icon.querySelector('p').innerHTML=myLikes.length;
//     }
// }

const addCoinLikes = async (coinId, likeIcon) => {
  const myLikes = await getLikes(coinId);
  const likess = myLikes.filter((item) => item.item_id === coinId)[0];
  console.log(likess ? likess.likes : 0);
  likeIcon.querySelector('p').innerHTML = `${likess ? `${likess.likes} Likes` : '0 Likes'}`;
};

const addLikeListner = () => {
  const likeIcons = document.querySelectorAll('.likeBtn');
  likeIcons.forEach((icon) => icon.addEventListener('click', async () => {
    const id = icon.id.split('-')[1];
    addLike(id);
    await addCoinLikes(id, icon);
    icon.querySelector('.fa-heart').classList.add('liked');
  }));
};

export {
  addLike, getLikes, addCoinLikes, addLikeListner,
};