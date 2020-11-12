import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";

function TicketsList(props) {

    const [tickets, setTickets] = useState([])
    const [searchId, setSearchId] = useState('')
    const [exception, setException] = useState('')
    const [loading, setLoading] = useState(true)
    const [ticketsInitial, setTicketsInitial] = useState([])

    useEffect( () => {
        setLoading(true)
        axios.get('https://front-test.beta.aviasales.ru/search')
            .then(res => {
                getTickets(res?.data?.searchId)
                setLoading(false)
            })
            .catch( (error) => {
                console.log(error)
            })
    },[])

    const getTickets = (searchIdNum) => {

        if(!searchIdNum)   return false
        setSearchId(searchIdNum)
        setLoading(true)
        axios.get('https://front-test.beta.aviasales.ru/tickets?searchId=' + searchIdNum)
            .then(res=> {
                if( res?.data?.tickets ) {
                    //TICKETS = res?.data?.tickets
                    setTicketsInitial(res?.data?.tickets)

                    // сразу сортируем по полю цена - по возрастанию!!!
                    //const sortedTickets = TICKETS.sort((a,b) => a.price - b.price);
                    const sortedTickets = ticketsInitial.sort((a,b) => a.price - b.price);
                    setTickets(sortedTickets)



                    console.log("ticketsInitial")
                    console.log(ticketsInitial)
                }
                setLoading(false)
            })
            .catch( (error) => {
                setException(error.message)
                setTickets([])
                setLoading(false)
            })
    }

    const makefilterTickets = (filteredTickets) => {
        //setTickets(filteredTickets)

        // сотировка по цене - по возрастанию !!!
        const sortedTickets = filteredTickets.sort((a,b) => a.price - b.price);
        setTickets(sortedTickets)

        // сортировка по внутреннему массиву - поле продолжительность !!!
        /*let sortedTicketsLong = TICKETS.sort((a,b) => a.segments.sort(seg1, seg2) => seg1.duration - seg2.duration);
        setTickets(sortedTicketsLong)*/
    }

    if(exception) return <div className={styles.ticketsContainerRoot}>Нет данных с сервера</div>
    if(loading) return <div className={styles.ticketsContainerRoot}>идет загрузка...</div>

    return (

        <div className={styles.ticketsContainerRoot}>

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
                            <TicketDetail {...ticket} key={
                                                            ticket.segments[0].date +
                                                            ticket.segments[0].destination +
                                                            ticket.segments[0].duration +
                                                            ticket.segments[0].origin } />
                        )
                        :
                        <div>Билетов нет</div>
                    }
                </div>
        </div>
    )
}

export default TicketsList
