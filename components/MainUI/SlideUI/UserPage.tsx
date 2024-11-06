import React from "react";
import { Window, WindowHeader, WindowContent, Button } from "react95";
import styled from "styled-components";
import Image from 'next/image';

export default function UserPage() {
  return (
    <Window>
      <WindowHeader>User</WindowHeader>
      <WindowContent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* User Avatar and Basic Info */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            border: '2px solid #424242'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              border: '2px solid #424242',
              borderRadius: '50%',
              overflow: 'hidden',
              position: 'relative'
            }}>
              <Image 
                src="/default-avatar.png" 
                alt="User Avatar"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div>
              <h2 style={{ margin: '0 0 8px 0' }}>Username</h2>
              <p style={{ margin: '0', color: '#424242' }}>ID: #123456</p>
            </div>
          </div>

          {/* User Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            <div style={{ 
              padding: '12px',
              border: '2px solid #424242',
              textAlign: 'center'
            }}>
              <p style={{ margin: '0', fontSize: '0.9em', color: '#424242' }}>Coins</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '1.2em', fontWeight: 'bold' }}>1,234</p>
            </div>
            <div style={{ 
              padding: '12px',
              border: '2px solid #424242',
              textAlign: 'center'
            }}>
              <p style={{ margin: '0', fontSize: '0.9em', color: '#424242' }}>Level</p>
              <p style={{ margin: '4px 0 0 0', fontSize: '1.2em', fontWeight: 'bold' }}>7</p>
            </div>
          </div>

          {/* Wallet Connection */}
          <Button style={{ width: '100%' }}>
            Connect Wallet
          </Button>
        </div>
      </WindowContent>
    </Window>
  );
}
