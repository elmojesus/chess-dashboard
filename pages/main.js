import Head from 'next/head'
import Link from 'next/link'
import Card from '../components/card'
import Board from '../components/board'
import NewBoard from '../components/newboard'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import React from 'react'
import io from 'socket.io-client'

const Game = require('../components/game')
const socket = io('http://localhost:8080')

export default function main() {

    const [join, setJoin] = useState([])
    const [spec, setSpec] = useState([])
    const [end, setEnd] = useState([])

    const sendNew = (link) => {
        socket.emit('new', link)
    }

    socket.on('connect', socket => {
        console.log('connected')
    })

    socket.on('UpdateGames', data => {
        const {j, s, e} = JSON.parse(data)
        //updateLists(j, s, e)
        console.log("RECEIVE")

        setJoin(j.map(item => new Game(item)))

        setSpec(s.map(item => new Game(item)))

        setEnd(e.map(item => new Game(item)))
    })

    return (
        <div className={styles.container}>
            <Head>
                <title>Chess</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.boardContainer}>
                    <div className={styles.row}>
                        <NewBoard title='Join Game' cards={join} addCard={setJoin} sendNew={sendNew}/>
                        <Board title='Spectate Game' cards={spec}/>
                        <Board title='Past Games' cards={end}/>
                    </div>
                </div>
            </main>
        </div>
    )
}