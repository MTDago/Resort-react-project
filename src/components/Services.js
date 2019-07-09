import React, { Component } from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa'
import Title from './Title'

export default class Services extends Component {
    state = {
        services: [
            {
                icon: <FaCocktail />,
                title: "Free Cocktails",
                info:"Free cocktails down at the bar, just ask for Alejandro"
            },
            {
                icon: <FaHiking />,
                title: "Hiking Trails",
                info:"The local hiking trails near us"
            },
            {
                icon: <FaShuttleVan />,
                title: "Catch the Free Resort Shuttle",
                info:"Guests can be transported anywhere on the island"
            },
            {
                icon: <FaBeer />,
                title: "The Best Beer",
                info:"Why not get smashed?"
            }
        ]
    }
    render() {
        return (
            <section className="services">
                <Title title="Services" />
                <div className='services-center'>
                    {this.state.services.map((item, index) => {
                        return <article key={index} className='service'>
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}

