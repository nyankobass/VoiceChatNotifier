import {Client, VoiceChannel} from  "discord.js"
import {config} from "./config"
import { LineNotify } from "./LineNotify";


const client = new Client();
const lineNotify = new LineNotify(config.lineTolen);

/** @note 入室後すぐに通知をすると部屋の出入りで凄まじい量の通知が発生しそうなので */
/**       不感帯を設ける*/
const NOTIFY_INTERVAL_MS = 2000;
const timerIdMap = {};
function onOpen(channel: VoiceChannel) {
    if (timerIdMap[channel.id] !=  null) {
        clearTimeout(timerIdMap[channel.id]);
        delete timerIdMap[channel.id];
    }

    timerIdMap[channel.id] = setTimeout(()=>{
        const message = "ボイスチャンネル『" + channel.name + "』が開始しました。";
        lineNotify.sendMessage(message);
        console.log("sendMessage: " + message);
        
        delete timerIdMap[channel.id];
    }, NOTIFY_INTERVAL_MS);
}
function onClose(channel: VoiceChannel) {
    if (timerIdMap[channel.id] !=  null) {
        clearTimeout(timerIdMap[channel.id]);
        delete timerIdMap[channel.id];
    }
    else {
        const message = "ボイスチャンネル『" + channel.name + "』が終了しました。";
        lineNotify.sendMessage(message)
        console.log("sendMessage: " + message);
    }
}

/** @note VoiceChannel の状態変化時通知 */
client.on("voiceStateUpdate", (oldState, newState) => {
    if (oldState.channel != null) {
        /* 退室の場合 */
        if (oldState.channel.members.size === 0) {
            onClose(oldState.channel);
        }
    }

    if (newState.channel != null) {
        /* 入室の場合 */
        if (newState.channelID !== oldState.channelID) {
            if (newState.channel.members.size === 1) {
                onOpen(newState.channel);
            }
        }
    }
});

client.login(config.dicordToken);