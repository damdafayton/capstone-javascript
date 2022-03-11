import { requestInvolvement } from './api';

const addLike = (coinId) => requestInvolvement.post('likes', { item_id: coinId });
const getLikes = async (coinId) => {
  const res = await requestInvolvement.get(`likes?item_id=${coinId}`);
  const result = res.json();
  return result;
};

const getAllLikes = async (request) => {
  const res = await request.get('likes');
  const result = res.json();
  return result;
};

const addLikesToList = async () => {
  const allCoinsLikes = await getAllLikes(requestInvolvement);
  const likeIcons = document.querySelectorAll('.likeBtn');
  likeIcons.forEach((icon) => {
    const id = icon.id.split('-')[1];
    const likes = allCoinsLikes.filter((item) => item.item_id === id)[0];
    icon.querySelector('p').innerHTML = `${likes ? `${likes.likes} Likes` : '0 Likes'}`;
  });
};

const updateLikes = (p) => {
  p.innerHTML = `${parseInt(p.textContent.split(' ')[0], 10) + 1} likes`;
};

const addLikeListner = () => {
  const likeIcons = document.querySelectorAll('.likeBtn');
  likeIcons.forEach((icon) => icon.addEventListener('click', async () => {
    const id = icon.id.split('-')[1];
    addLike(id);
    updateLikes(icon.querySelector('p'));
    icon.querySelector('.fa-heart').classList.add('liked');
  }));
};

export {
  addLike, getLikes, addLikeListner, addLikesToList, getAllLikes,
};