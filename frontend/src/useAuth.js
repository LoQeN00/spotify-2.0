import {useState,useEffect} from 'react'
import axios from 'axios'
export const useAuth = code => {
    const [accessToken,setAccessToken] = useState()
    const [refreshToken,setRefreshToken] = useState()
    const [expiresIn,setExpiresIn] = useState()

    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code: code
        }).then(res => {
            const {accessToken,refreshToken,expiresIn} = res.data
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)
            setExpiresIn(expiresIn)
            window.history.pushState({},null,'/')
        }).catch(e => {
            console.log(e)
            window.location="/"
        })
    },[code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const timeout = setInterval(() => {
            axios.post('http://localhost:3001/refresh', {
                refreshToken: refreshToken
            }).then(res => {
                setAccessToken(res.data.accessToken)
                setExpiresIn(res.data.expiresIn)
                console.log(res)
            }).catch(e => {
                console.log(e)
                window.location="/"
            })
        },(expiresIn-60) * 1000)

       
        return () => {
            clearInterval(timeout)
        }

    },[refreshToken,expiresIn])

    return {
        accessToken,
        refreshToken,
        expiresIn
    }
}