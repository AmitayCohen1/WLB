import React from 'react'
import PropTypes from 'prop-types';
import {Box, CircularProgress, Typography} from "@mui/material"



    export const CircularProgressWithLabel = (props)=> {
        return (
          <Box sx={{ position: 'relative', display: 'flex' ,flexDirection:"column",placeContent:"center",placeItems:"center"}}>
            <CircularProgress variant="determinate" {...props} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="caption" component="div">
                {`${Math.round(props.value)}%`}
              </Typography>
              <p>Your record is a big deal. Your video is uploading right now. Please give big files a few minutes. You can keep this tab open and check back soon to see your rank and badge
</p>
            </Box>
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
