/**
 * Payload Encoder/Decoder for The Things Network v3
 * 
 * Copyright 2021 Milesight IoT
 * 
 * @product UC11 series
 *Json Example: {"dout1": "on","dout2": "off"}
 */
function encodeDownlink(input) {
    var data = {};
    var warnings = [];

    var events = {
      85: "ursalink_uc11xx",
    };
    data.event = events[input.fPort];

    //DOUT
    if (input.dout1) {
        data.push(0x09);
        if (input.dout1 == "on") {
            data.push(0x01);
        } else if(input.dout1 == "off"){
            data.push(0x00);
        }
        data.push(0x00);
        data.push(0xff);
    }

    // DOUT2 only for UC1114
    if(input.dout2){
        data.push(0x0A);
        if (input.dout2 == "on") {
            data.push(0x01);
        } else if(input.dout2 == "off"){
            data.push(0x00);
        }
        data.push(0x00);
        data.push(0xff);
    }

    return {
      data: data,
      fPort: 1,
      warnings: [],
      errors: []
    };
  }
  
  function decodeDownlink(input) {
    var data = {};
    var warnings = [];

    var events = {
      85: "ursalink_uc11xx",
    };
    data.event = events[input.fPort];

    return {
      data: {
        bytes: input.bytes
      },
      warnings: [],
      errors: []
    }
  }
