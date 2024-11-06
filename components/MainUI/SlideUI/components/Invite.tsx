import React from "react";
import styled from "styled-components";
import { Window, WindowHeader, WindowContent, TextInput, Button, ProgressBar } from "react95";

export default function Invite() {
    return (
        <Window>
            <WindowHeader>Invite</WindowHeader>
            <WindowContent>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '8px' }}>
                    <div style={{ border: '2px solid #424242', padding: '16px' }}>
                        <p>邀请码: ABC123XYZ</p>
                        <div style={{ 
                            display: 'flex',
                            gap: '8px',
                            marginTop: '8px'
                        }}>
                            <TextInput
                                value="https://game.com/invite/ABC123XYZ"
                                disabled
                                style={{ flex: 1 }}
                            />
                            <Button>复制</Button>
                        </div>
                    </div>

                    <div style={{ border: '2px solid #424242', padding: '16px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '8px'
                        }}>
                            <span>已邀请: 3人</span>
                            <span>目标: 5人</span>
                        </div>
                        <ProgressBar value={60} variant="tile" />
                        <Button style={{ marginTop: '16px', width: '100%' }}>
                            领取奖励
                        </Button>
                    </div>
                </div>
            </WindowContent>
        </Window>
    )
}