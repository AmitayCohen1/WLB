import React from 'react'
import PropTypes from 'prop-types';
import {Box, CircularProgress, Typography} from "@mui/material"



    export const CircularProgressWithLabel = (props)=> {
        return (
          <Box sx={{ position: 'relative', display: 'flex' ,flexDirection:"column",placeContent:"center",placeItems:"center",marginTop:"1rem",marginBottom:"1rem"}}>
         
            <Box
              sx={{
              
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign:"center",
               color:"#fff",
               marginBottom:"1.25rem"
            
              }}
            >
            <CircularProgress variant="determinate" {...props} sx={{color: "rgb(243 93 69)", 
             width:"200px !important",  
             height:"200px !important",            
            fontSize:"60px !important",
            }} />
             <Typography sx={{ 
                position: 'absolute',
                top: "50%", 
                right: "50%",
                transform: "translate(50%,-50%)",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign:"center",
                
            }}
               >
             {`${Math.round(props.value)}%`}
             </Typography>
          
           
            
            </Box>
            { props.value <= 100 && 
            <Typography variant="caption" component="div" style={{color:"#fff",maxWidth:"50%", textAlign:"center"}}>
              Your record is a big deal. Your video is uploading right now. Please give big files a few minutes. You can keep this tab open and check back soon to see your rank and badge

              </Typography>}  
          </Box>
        );
      }
      
      CircularProgressWithLabel.propTypes = {
        /**
         * The value of the progress indicator for the determinate variant.
         * Value between 0 and 100.
         * @default 0
         */
        value: PropTypes.number.isRequired,
      };