import React, { Component } from 'react'
import items from './data'
import { parse } from '@babel/parser';

const RoomContext = React.createContext()

class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    }

    componentDidMount() {
        let rooms = this.formatData(items)
        let featuredRooms = rooms.filter(room => room.featured === true)
        let maxPrice = Math.max(...rooms.map(item => item.price))
        let maxSize = Math.max(...rooms.map(item => item.maxSize))
        maxSize = parseInt(maxSize)
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading: false,
            maxPrice,
            maxSize
        })
    }

    formatData(items) {
        let tempItems = items.map(item => {
            let id = item.sys.id
            let images = item.fields.images.map(image => image.fields.file.url)
            let rooms = { ...item.fields,images,id }
            return rooms
        })
        return tempItems
    }

    getRoom = (slug) => {
        let tempRooms = [ ...this.state.rooms ]
        const room = tempRooms.find(room => room.slug === slug)
        return room
    }

    handleChange = event => {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = event.target.name
        this.setState({
            [name]: value
        }, this.filterRooms)
    }

    filterRooms = () => {
        let { rooms, type, price, minSize, maxSize, breakfast, pets, capacity } = this.state
        // All the rooms
        let tempRooms = [...rooms]
        // Transform data type
        capacity = parseInt(capacity)
        price = parseInt(price)
        maxSize = parseInt(maxSize)

        // Filter by Type
        if (type !== 'all') {
            tempRooms = tempRooms.filter(room => room.type === type)
        }
        
        // Filter by Type
        if (capacity !==1) {
            tempRooms = tempRooms.filter(room => room.capacity >= capacity)
        }

        // Filter by Price
            tempRooms = tempRooms.filter(room => room.price <= price)

        // Filter by Size
            tempRooms = tempRooms.filter(room => room.minSize <= minSize && room.maxSize >= maxSize)
        
        // Filter by Breakfast checkbox
        if (breakfast) {
            tempRooms = tempRooms.filter(room => room.breakfast === true)
        }

        // Filter by Breakfast checkbox
        if (pets) {
            tempRooms = tempRooms.filter(room => room.pets === true)
        }

        this.setState({
            sortedRooms: tempRooms
        })
    }
    render() {
        return <RoomContext.Provider value={{
            ...this.state,
            getRoom: this.getRoom,
            handleChange: this.handleChange
        }}>
            {this.props.children}
        </RoomContext.Provider>
    }
}

const RoomConsumer = RoomContext.Consumer

// Higher Order Function to bring the context inside the rendered Component, in case we need to call on these context values frequently

// export function withRoomConsumer(Component) {
//     return function ConsumerWrapper(props) {
//         <RoomConsumer>
//             {value = <Component {...props} context={value}/>}
//         </RoomConsumer>
//     }
// }

export { RoomProvider, RoomConsumer, RoomContext }