import { useState, useCallback, useEffect } from 'react';
let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [formId, setFormId] = useState("");
  const [adminArea, setAdminArea] =  useState("");

  const login = useCallback((uid, token,isAdmin, form,area, expirationDate) => {
    setToken(token);
    setUserId(uid);
    setAdmin(isAdmin == "true"|| isAdmin == true);
    setFormId(form);
    setAdminArea(area);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        admin: isAdmin == "true" || isAdmin == true,
        formId : form,
        adminArea: area,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    setAdmin(null);
    setFormId(null);
    setAdminArea(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token,storedData.admin, storedData.formId, storedData.adminArea ,new Date(storedData.expiration) );
    }
  }, [login]);

  return { token, login, logout, userId, admin, formId, adminArea };
};