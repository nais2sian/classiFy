import axios from "axios"
import { AdFormData } from "../pages/formdata"
import { Ad, AdType } from "../types";

  // export async function getAllItems() {
  //   const res = await axios.get("http://localhost:3000/items")
  //   return res.data
  // }
export async function getAllItems() {
  const BASE_URL = 'http://localhost:3000';
  const endpoints = ['realEstate', 'auto', 'services'];

  const requests = endpoints.map((ep) =>
    fetch(`${BASE_URL}/${ep}`).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch ${ep}: ${res.status}`);
      }
      return res.json();
    })
  );

  try {
    const [realEstate, auto, services] = await Promise.all(requests);
    const cards = [
      ...realEstate.map((c: AdFormData) => ({ ...c, category: 'realEstate' })),
      ...auto.map((c: AdFormData) => ({ ...c, category: 'auto' })),
      ...services.map((c: AdFormData) => ({ ...c, category: 'services' })),
    ];

    return cards;
  } catch (err) {
    console.error('Ошибка при загрузке карточек:', err);
    throw err; 
  }
}

function toCamelCase(str: string): string {
  const words = str.split('_')
  words.forEach((word, i) => {
    words[i] = word.toLowerCase()
    if (i != 0) words[i] = words[i][0].toUpperCase() + words[i].slice(1).toLowerCase()
  })
  return words.join('')
}

  export async function getItemById(category: AdType, id: number) {
    const res = await axios.get(`http://localhost:3000/${toCamelCase(category)}/${id}`)
    return res.data
  }

  export async function postAd(formData: AdFormData){
    const res = await axios.post(`http://localhost:3000/${toCamelCase(formData.type)}`, formData)
    return res.data
  }

    
type UpdatePayload = Partial<Ad> & Pick<Ad, 'type'>;

export async function patchAd(formData: UpdatePayload, id: number) {
  const url = `http://localhost:3000/${toCamelCase(formData.type)}/${id}`;
  const res = await axios.patch(url, formData);
  return res.data as Ad;
}