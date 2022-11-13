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
            <CircularProgress variant="determinate" {...props}
            
            className="!text-red !w-28 !h-28 !md:w-52 !md:h-52 !text-5xl !md:text-7xl" />
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
            { props.value ===0 ? 
            <h1 variant="caption" component="div"  className="text-2xl text-white text-align-left text-center">
              Preparing...
              </h1> : props.value < 100 ?
               <h1 variant="caption" component="div"  className="text-2xl text-white text-align-left text-center">
               Your record is a big deal. Your video is uploading right now. 
               <br/>
               Please give big files a few minutes. 
               <br/>
               You can keep this tab open and check back soon to see your rank and badge.
                </h1> :<h1 variant="caption" component="div"  className="text-2xl text-white text-align-center text-center">
             Processing...
              </h1> }  
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
