import SQLD from '../assets/certificate/SQLD.png'
import webd from '../assets/certificate/webd.png'
import ADsP from '../assets/certificate/ADsP.png'


export type Certificate = {
  id : number;
  title : string;
  date : string;
  issuer : string;
  img : string;
}

export const certificates : Certificate[] = [
  {
    id : 1,
    title : 'SQLD',
    date : '2025.06.27',
    issuer : 'K-DATA',
    img : SQLD
  },
  {
    id : 2,
    title : 'ADsP',
    date : '2025.09.05',
    issuer : 'K-DATA',
    img : ADsP
  },
  {
    id : 3,
    title : '웹디자인개발기능사',
    date : '2025.06.27',
    issuer : '한국산업인력공단',
    img : webd
  },
]