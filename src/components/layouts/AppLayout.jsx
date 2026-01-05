import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  House,
  Briefcase,
  FileText,
  Users,
  Envelope,
  Bell,
  SignOut
} from '@phosphor-icons/react';
import { api } from '../../lib/apiClient.js';

export default function AppLayout({ user, children }) {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await api.getNotifications();
      setNotifications(data.notifications);
      setUnreadCount(data.unreadCount);
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      loadNotifications();
    } catch (error) {
      console.error('Error marking notification:', error);
    }
  };

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar__header">
          <h1 className="sidebar__title">Het Spectrum</h1>
          <p className="sidebar__subtitle">Sollicitaties</p>
        </div>

        <nav className="sidebar__nav">
          <Link to="/" className="nav-item">
            <House size={20} weight="duotone" />
            <span>Dashboard</span>
          </Link>

          <Link to="/jobs" className="nav-item">
            <Briefcase size={20} weight="duotone" />
            <span>Vacatures</span>
          </Link>

          <Link to="/applications" className="nav-item">
            <FileText size={20} weight="duotone" />
            <span>Sollicitaties</span>
          </Link>

          <Link to="/candidates" className="nav-item">
            <Users size={20} weight="duotone" />
            <span>Kandidaten</span>
          </Link>

          <Link to="/mail/outbox" className="nav-item">
            <Envelope size={20} weight="duotone" />
            <span>Mails</span>
          </Link>
        </nav>

        <div className="sidebar__footer">
          <div className="user-info">
            <div className="user-info__name">{user?.name}</div>
            <div className="user-info__role">{user?.role}</div>
          </div>
        </div>
      </aside>

      <div className="main-content">
        <header className="topbar">
          <div className="topbar__actions">
            <button
              className="notification-button"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell size={24} weight={unreadCount > 0 ? 'fill' : 'regular'} />
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            <button className="logout-button" onClick={handleLogout}>
              <SignOut size={24} />
              <span>Uitloggen</span>
            </button>
          </div>

          {showNotifications && (
            <div className="notifications-dropdown">
              <div className="notifications-dropdown__header">
                <h3>Notificaties</h3>
                {unreadCount > 0 && (
                  <button
                    className="link-button"
                    onClick={async () => {
                      await api.markAllNotificationsRead();
                      loadNotifications();
                    }}
                  >
                    Alles markeren als gelezen
                  </button>
                )}
              </div>
              <div className="notifications-dropdown__list">
                {notifications.length === 0 ? (
                  <div className="notifications-empty">Geen notificaties</div>
                ) : (
                  notifications.slice(0, 10).map(notif => (
                    <div
                      key={notif.id}
                      className={`notification-item ${notif.is_read ? 'read' : 'unread'}`}
                    >
                      <p>{notif.payload_json?.message}</p>
                      {!notif.is_read && (
                        <button onClick={() => handleMarkAsRead(notif.id)}>
                          Markeer gelezen
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </header>

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
