import React from 'react'
import { useContext } from 'react'
import { RoomContext }from '../Context'
import Title from '../components/Title'

const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))]
}

export default function RoomFilter({rooms}) {
    const context = useContext(RoomContext)
    const {
        handleChange, 
        type,
        capacity,
        price,
        maxPrice,
        minPrice,
        maxSize,
        minSize,
        breakfast,
        pets
    } = context
// get Unique types
    let types= getUnique(rooms, 'type')
// add all
    types = ['all', ...types]
// map to jsx
    types = types.map((item, index) => {
        return <option value={item} key={index}>{item}</option>
    })

    // Guests filter
    let people = getUnique(rooms, 'capacity')
    people = people.map((item, index) => {
        return <option key={index} value={item}>{item}</option>
    })

    return (
        <section className='filter-container'>
            <Title title='search rooms' />
            <form className='filter-form'>
                {/* select type */}
                <div className='form-group'>
                    <label htmlFor='type'>Room type</label>
                    <select name='type' id='type' value={type} className='form-control' onChange={handleChange}>
                        {types}
                    </select>
                </div>
                {/* end select type */}
                {/* select guests */}
                <div className='form-group'>
                    <label htmlFor='capacity'>Guests</label>
                    <select 
                        name='capacity' 
                        id='capacity' 
                        value={capacity} 
                        className='form-control' 
                        onChange={handleChange}
                    >
                        {people}
                    </select>
                </div>
                {/* end select guests */}
                {/* select price */}
                <div className='form-group'>
                    <label htmlFor='price'>Price ${price}</label>
                    <input
                        type='range'
                        name='price' 
                        id='price' 
                        value={price} 
                        min={minPrice}
                        max={maxPrice}
                        className='form-control' 
                        onChange={handleChange}
                    >
                    </input>
                </div>
                {/* end select price */}
                {/* select size */}
                <div className='form-group'>
                    <label htmlFor='size'>
                        room size
                    </label>
                    <div className='size-inputs'>
                        <input
                            className='size-input' 
                            type='number' 
                            name='minSize' 
                            value={minSize} 
                            onChange={handleChange}
                        >
                        </input>
                        <input
                            className='size-input' 
                            type='number' 
                            id='size'
                            name='maxSize' 
                            value={maxSize}
                            onChange={handleChange}
                        >
                        </input>
                    </div>
                </div>
                {/* end select size */}
                {/* extras */}
                <div className='form-group'>
                <div className='single-extra'>
                        <input
                            type='checkbox'
                            name='breakfast'
                            id='breakfast'
                            check={breakfast}
                            onChange={handleChange}
                        />
                        <label htmlFor='breakfast'>breakfast</label>
                    </div>
                    <div className='single-extra'>
                        <input
                            type='checkbox'
                            name='pets'
                            id='pets'
                            check={pets}
                            onChange={handleChange}
                        />
                        <label htmlFor='pets'>pets</label>
                    </div>
                </div>
                {/* end of extras */}
                </form>
        </section>
    )
}
