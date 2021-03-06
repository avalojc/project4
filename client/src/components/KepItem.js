import React, { Component } from 'react'
import axios from 'axios'

export class KepItem extends Component {
    state = {
        KeplerianElementsList: [],
        set_x: "",
        set_y: 100,
        set_z: ""
    }
    componentDidMount() {
        this.refreshSolarSystem0()
        this.kepMathVars()
    }
    refreshSolarSystem0 = (kepId) => {
        axios.get(`/api/v1/KeplerianElements/${this.props.kepId}`, kepId) /////////need to make it id specific
            .then((res) => {
                this.setState({
                    KeplerianElementsList: res.data
                })
            })
    }



    kepMathVars = () => {
        //set the givens
        let axd = parseFloat(this.props.axd)
        let axs = parseFloat(this.props.axs)
        let ecd = parseFloat(this.props.ecd)
        let ecs = parseFloat(this.props.ecs)
        let ind = parseFloat(this.props.ind)
        let ins = parseFloat(this.props.ins)
        let lgd = parseFloat(this.props.lgd)
        let lgs = parseFloat(this.props.lgs)
        let phd = parseFloat(this.props.phd)
        let phs = parseFloat(this.props.phs)
        let and = parseFloat(this.props.and)
        let ans = parseFloat(this.props.ans)
        //whats the julian date
        let today = new Date();
        let julianday = (today.valueOf()/(1000*60*60*24)-.5) + 2440588
        let Teph = julianday            //12/2/19 @~1338
        let Tval = (Teph-2451545.0)/36525
        //step 1
        let axv = axs + axd * Tval                          //au
        let ecv = ecs + ecd * Tval                          //this is in radians?
        let inv = ins + ind * Tval                          //deg
        let lgv = (lgs + lgd * Tval)%360+360                        //deg
        let phv = phs + phd * Tval                        //deg
        let anv = ans + and * Tval                          //deg
        //bonus var for step 3 
        let ecvStar = ecv * 180 / Math.PI
        //step 2
        let uuv = phv - anv
        let capitalM = lgv - phv
        //step 3
        let capitalMModulus = capitalM%360-180
        let functional=(x)=>{
            if (x <= -180) { return x + 360  }
            else {return x}
        }
        let meanAnomalyBetweenN180And180 = functional(capitalMModulus)

        let keplersEquation=(Mval, echoStar, echo, )=>{
        let valE0 = Mval + echoStar * Math.sin(Mval)
        let deltaMeanAnomaly = Mval-(valE0-echoStar*Math.sin(valE0))
        let deltaE = deltaMeanAnomaly/ (1-echo*Math.cos(valE0))
        let valE1 = valE0 + deltaE
        if(Math.abs(valE1-valE0)<!.05){
            valE0=valE1
            deltaMeanAnomaly = Mval-(valE0-echoStar*Math.sin(valE0))
            deltaE = deltaMeanAnomaly/ (1-echo*Math.cos(valE0))
            valE1 = valE0 + deltaE
            if(Math.abs(valE1-valE0)<!.05){
                valE0=valE1
                deltaMeanAnomaly = Mval-(valE0-echoStar*Math.sin(valE0))
                deltaE = deltaMeanAnomaly/ (1-echo*Math.cos(valE0))
                valE1 = valE0 + deltaE
                if(Math.abs(valE1-valE0)<!.05){
                    valE0=valE1
                    deltaMeanAnomaly = Mval-(valE0-echoStar*Math.sin(valE0))
                    deltaE = deltaMeanAnomaly/ (1-echo*Math.cos(valE0))
                    valE1 = valE0 + deltaE
                    return valE1
                }
                else{return valE1}
            }
            else{return valE1}
        }
        else{return valE1}
    }
        let valueOfE = keplersEquation(meanAnomalyBetweenN180And180, ecvStar, ecv)
        //step four
        let xPrime = axv*(Math.cos(valueOfE)-ecv)
        let yPrime = axv*(Math.sqrt(1-ecv*ecv))*Math.sin(valueOfE)
        // let zPrime = 0
        //step 5
        let xecl = ( (Math.cos(uuv)*Math.cos(anv)-Math.sin(uuv)*Math.sin(anv)*Math.cos(inv))*xPrime+ ((-Math.sin(uuv)*Math.cos(anv)-Math.cos(uuv)*Math.sin(anv)*Math.cos(inv))*yPrime))
        let yecl = ( (Math.cos(uuv)*Math.cos(anv)+Math.sin(uuv)*Math.sin(anv)*Math.cos(inv))*xPrime+ ((-Math.sin(uuv)*Math.sin(anv)-Math.cos(uuv)*Math.cos(anv)*Math.cos(inv))*yPrime))
        let zecl = ( (Math.sin(uuv)*Math.sin(inv))                                          *xPrime+ ((Math.cos(uuv)*Math.sin(inv))                                                  *yPrime))
        //step 6
        let epsilon = 23.43928
        let xeq = xecl
        let yeq = Math.cos(epsilon) * yecl - Math.sin(epsilon)*zecl
        let zeq = Math.sin(epsilon) * yecl + Math.cos(epsilon)*zecl
        //convert from au to px
        this.setState({
            set_x: xeq*180,
            set_y: yeq*180,
            set_z: zeq*180
        })
    
    }



    render() {
        const KepItemStyle = {
            position: 'absolute',
            top: `${this.state.set_y}px`,
            left: `${this.state.set_x}px`,
            background: 'white',
            width: '1px',
            height: '1px',
        }

        return (
            <div className={this.props.name} style={KepItemStyle} >
            </div>
        )
    }
}

export default KepItem