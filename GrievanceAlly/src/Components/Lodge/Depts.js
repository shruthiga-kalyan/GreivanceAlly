import React from 'react'
import bank from '../../Assets/img/bank.jpg'
import labour from '../../Assets/img/labour.avif'
import tax from '../../Assets/img/tax.jpeg'
import tele from '../../Assets/img/tele.jpeg'
import urban from '../../Assets/img/urban.jpeg'
import personal from '../../Assets/img/personal.jpg'
import health from '../../Assets/img/health.jpeg'
import post from '../../Assets/img/post.jpeg'
import { Button } from '@mui/material'

const cards = [
    {
      id: 1,
      date: "14.05.24",
      dept:"Financial Services(Banking Division)",
      topic: "Increase demand and economic activities by raising funds with the help of services like banking and mortgages.",
      image: bank,
    },
    {
      id: 2,
      date: "14.05.24",
      dept:"Labour and Employment",
      topic:
        "Provides liquidity and capital to flow freely in the marketplace resulting in the growth of economy.",
      image: labour,
    },
    {
      id: 3,
      date: "14.05.24",
      dept:"Central board of Direct Tax",
      topic:
        "Promoting price stability by enforcing various direct tax laws",
      image: tax,
    },
    {
      id: 4,
      date: "14.05.24",
      dept:"Telecommunications",
      topic: "To organize and provide research, training and consultancy in the aspects of communication finance.",
      image: tele,
    },
    {
      id: 5,
      date: "14.05.24",
      dept:"Housing and Urban Affairs",
      topic: "Formulating and administering rules, regulations, and laws relating to housing and urban development",
      image: urban,
    },
    {
      id: 6,
      date: "14.05.24",
      dept:"Personnel and Training",
      topic: "Mr. Dubi Gerber former EU application evaluator",
      image: personal,
    },
    {
      id: 7,
      dept:"Health and Family Welfare",
      date: "14.05.24",
      topic:
        "Ensuring availability of quality healthcare on equitable, accessible and affordable basis across regions.",
      image: health,
    },
    {
      id: 8,
      date: "14.05.24",
      dept:"Posts",
      topic: "Program life us expanding its offers for call for proposals",
      image: post,
    },
];

export default function Depts({handleBackClick,handleLodgeDept}) {
    return (
        <div style={{ margin: 'auto auto', border: '4px solid #ddd', borderRadius: '8px', width: '99%' }}>
            <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto">
                <div className="flex items-center sm:justify-between justify-center flex-wrap my-8" id="departments">
                    <p style={{ fontSize: '25px' }}><b>Departments</b></p>
                    <Button sx={{backgroundColor:'rgb(226, 62, 62)'}}variant="contained" color='secondary' onClick={()=>{handleBackClick()}}>Back</Button>
                    <article className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 place-items-center lg:gap-10 gap-2" style={{ marginTop: '2%' }}>
                        {cards.map((card) => (
                            <div className="h-340 w-320" key={card.id} style={{ marginTop: '2%' }}>
                                <div className="relative rounded-xl overflow-hidden">
                                    <img src={card.image} alt="fund1" />
                                </div>
                                <div className="text-[#d48026] hover:text-[#6D9886] transition-colors cursor-pointer" style={{ fontSize: '18px', marginTop: '5%', textAlign: 'center' }} onClick={()=>{handleLodgeDept(card.dept)}}>
                                    <b>{card.dept}</b>
                                </div>
                            </div>
                        ))}
                    </article>
                </div>
            </div>
        </div>
    )
}
