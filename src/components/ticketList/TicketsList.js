import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";
import {setTicketsInitial, setTickets} from "../../reduxToolkit/toolkitSlice";
import {useDispatch, useSelector} from "react-redux";

function TicketsList(props) {

    const ticketsInitial = useSelector(state => state.toolkit.ticketsInitial)
    const tickets = useSelector(state => state.toolkit.tickets)

    const [exception, setException] = useState('')
    const [loading, setLoading] = useState(true)
    const [filter, setFilterValue] = useState()
    const [searchId, setSearchId] = useState(null)
    const [checkBoxChecked, setCheckBoxChecked] = useState(false)

    const dispatch = useDispatch()

    useEffect( () => {
        axios.get('https://front-test.beta.aviasales.ru/search')
            .then(res => {
                //setSearchId(res?.data?.searchId)
                dispatch(setTicketsInitial(res?.data?.searchId))
            })
            .catch( (error) => {
                setException(error.message)
            })
    },[])

    const makefilterTickets = (filteredTickets) => {
        console.log("filteredTickets = ")
        console.log(filteredTickets)
        // сотировка по цене - по возрастанию !!!
        //let sortedTickets = filteredTickets.sort((a,b) => a.price - b.price);
        //setTickets(sortedTickets)
        dispatch(setTickets(filteredTickets))
    }

    if(exception) return <div className={styles.content}><div className={styles.ticketsContainer}>Нет данных с сервера</div></div>
    if(loading) return <div className={styles.content}><div className={styles.ticketsContainer}>Идет загрузка...</div></div>

    return (
        <div className={styles.content}>

            <FilterLeft ticketsIntitial={ticketsInitial} makefilterTickets={makefilterTickets} />

            <div className={styles.ticketsContainer}>
                <div className={styles.ticketTypeCheckers}>
                    <div className={styles.ticketTypeCheckerChecked}>
                        <div className={styles.ticketTypeCheckerText}>Самый дешевый</div>
                    </div>
                    <div className={styles.ticketTypeChecker}>
                        <div className={styles.ticketTypeCheckerText}>Самый быстрый</div>
                    </div>
                </div>
                {tickets ?
                    tickets.map((ticket) =>
                        <TicketDetail {...ticket} key={Math.random()}/>
                    )
                    :
                    <div>Билетов нет</div>
                }
            </div>
        </div>
    )
}

export default TicketsList