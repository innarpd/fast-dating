import React, { useState } from "react"
import api from "../api"

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const [count, setCount] = useState(users.length)
       
    const handleDelete = (usedId) => {
        setUsers((prevState) => prevState.filter((user) =>user._id !== usedId))
        setCount((prevState) => prevState - 1)
    }
    const renderUsers = () => {
        return users.length !==0 &&
            users.map(user => {
                return (
                    <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>
                            {user.qualities.map(item => {
                                return <span
                                    key={item._id}
                                    className={`badge m-2 bg-${item.color}`}>
                                    {item.name}
                                </span>
                            })}
                        </td>
                        <td>{user.profession.name}</td>
                        <td>{user.completedMeetings}</td>    
                        <td>{user.rate}</td>   
                        <td><button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Delete</button></td>
                    </tr>
                )
        })
    }
    const renderPhrase = (number) => {
        return count > 1 && count < 5 ? `${count} человека тусанет с тобой сегодня` : `${count} человек тусанет с тобой сегодня`
    }
     const formatCount = () => {
        return count === 0 ? "Никто не тусанет с тобой сегодня" : renderPhrase()
    }
    const getBadgeClasses = () => {
        let classes = "badge "
        classes += count === 0 ? "bg-danger" : "bg-primary"
        return classes
    }
    return <>
        <span className={getBadgeClasses()}>{formatCount()}</span>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                </tr>
            </thead>
            <tbody>
                {renderUsers()}
            </tbody>
        </table>
    </>
    
}

export default Users