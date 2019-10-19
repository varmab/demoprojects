import React, {Component} from 'react'
import {
    WebView
} from 'react-native'
import {Content} from 'native-base'

class About extends Component{
    state={
        about:`
            <html>
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="background-color:black;color:white">
                    <h1><center>Meenakshi Law Associates</center></h1>
                    <p>
                        Established in 2003, The Meenakshi Law Associates is the leading authority on legal fees and legal fee management. Our clients include major corporations, government agencies, law firms, insurance companies, and anyone else who pays substantial legal fees, needs to examine the reasonableness of fees, or wishes to analyze litigation issues. We are nationally-recognized for our legal fee management and litigation consulting expertise, including legal bill reviews and expert testimony. Our engagements include supporting or challenging legal bills on behalf of lawyers, clients, and where fee-shifting and fee petitions are involved. We have examined over $1 million in legal fees from over a thousand law firms, in hundreds of engagements. Our Advocates and Lawyers appear in Honble Supreme Court of India, various High Courts in India and other competent courts of Law established all over the nation. Our Advocates also give top quality legal advise to corporate sector and various other organizations like N.G.Os. associations, co-operative societies etc. and are also experts in the latest legal research. We only believe in sincerity and earnestness and speed is the essence of our organization.
                    </p>
               </body>
            </html>
        `
    }
    
    constructor(){
        super();
    }

    render(){
        return (
            <Content contentContainerStyle={{flex:1}}>
                <WebView
                        originWhitelist={['*']}
                        source={{ html: this.state.about }}
                    />
            </Content>
        )
    }
}


export default About;

