import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";
import {getSearchId, getTicketsInitial} from "../../reduxToolkit/toolkitSlice";

import { useDispatch } from 'react-redux';

function TicketsList(props) {

    const [tickets, setTickets] = useState([])
    const [searchId, setSearchId] = useState('')
    const [exception, setException] = useState('')
    const [loading, setLoading] = useState(true)
    const [ticketsInitial, setTicketsInitial] = useState([])

    const dispatch = useDispatch()

    useEffect( () => {
        setLoading(true)
        dispatch(getSearchIdNum())
    },[dispatch])



    const getSearchIdNum = () => async dispatch => {
        try {
            await axios.get('https://front-test.beta.aviasales.ru/search')
                .then(res =>
                    dispatch(getSearchId(res?.data?.searchId)))
            }
            catch(error) {
                console.log(error)
            }
        }

    useEffect( () => {
        setLoading(true)
        dispatch(getTicketsInitialArr(searchId))
    },[searchId])

    const getTicketsInitialArr = (searchId) => async dispatch => {

        if(!searchId)   return false

        await axios.get('https://front-test.beta.aviasales.ru/tickets?searchId=' + searchId)
            .then(res=> {
                if( res?.data?.tickets ) {
                    dispatch(getTicketsInitial(searchId))
                }
                setLoading(false)
            })
            .catch( (error) => {
                setException(error.message)
                setTickets([])
                setLoading(false)
            })
    }

    useEffect( ()=> {

        // сразу сортируем по полю цена - по возрастанию!!!
        const sortedTickets = ticketsInitial.sort((a,b) => a.price - b.price);
        setTickets(sortedTickets)

    }, [ticketsInitial])

    const makefilterTickets = (filteredTickets) => {

        // сотировка по цене - по возрастанию !!!
        const sortedTickets = filteredTickets.sort((a,b) => a.price - b.price);
        setTickets(sortedTickets)
    }

    if(exception) return <div className={styles.ticketsContainerRoot}>Нет данных с сервера</div>
    if(loading) return <div className={styles.ticketsContainerRoot}>идет загрузка...</div>

    return (

        ticketsInitial ?

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
        : ""
    )
}

export default TicketsList
