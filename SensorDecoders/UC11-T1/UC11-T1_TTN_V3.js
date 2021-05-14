/**
 * Payload Decoder for The Things Network
 * 
 * Copyright 2020 Milesight IoT
 * 
 * @product UC11-T1
 */
 function decodeUplink(input) {
    var data = {};
    var warnings = [];

    var events = {
        85: "Milesight-IoT"
      };
    data.event = events[input.fPort];

    for (var i = 0; i < input.bytes.length;) {
        var channel_id = input.bytes[i++];
        var channel_type = input.bytes[i++];

        // BATTERY
        if (channel_id == 0x03 && channel_type === 0x75) {
            data.battery = input.bytes[i];
            i += 1;
        }
        // TEMPERATURE
        else if (channel_id == 0x01 && channel_type === 0x67) {
            // ℃
            data.temperature = (readInt16LE(input.bytes.slice(i, i + 2))) / 10;
            i += 2;

            // ℉
            // data.temperature = readInt16LE(input.bytes.slice(i, i + 2)) / 10 * 1.8 + 32;
            // i +=2;
        }
        // HUMIDITY
        else if (channel_id == 0x02 && channel_type === 0x68) {
            data.humidity = input.bytes[i] / 2;
            i += 1;
        } else {
            break;
        }
    }

    return data;
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt16LE(bytes) {
    var value = (bytes[1] << 8) + bytes[0];
    return (value & 0xFFFF);
}

function readInt16LE(bytes) {
    var ref = readUInt16LE(bytes);
    return (ref > 0x7FFF) ? ref - 0x10000 : ref;
}
