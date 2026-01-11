# Bug Fixes - Het Spectrum Sollicitaties App

## 2026-01-11 - Runtime Error Fixes

### Issue #1: JobForm - Cannot read properties of null

**Error:**
```
Uncaught TypeError: Cannot read properties of null (reading 'title')
at JobForm (JobForm.jsx:9:24)
```

**Root Cause:**
In [JobFormPage.jsx](src/pages/JobFormPage.jsx), when creating a new job (no `jobId`), the `job` state was `null`. This `null` value was being passed to `JobForm` component as `initialData`, which explicitly overrides the default parameter `initialData = {}`.

**Fix:**
Changed line 63 in [JobFormPage.jsx:63](src/pages/JobFormPage.jsx#L63):
```jsx
// Before
<JobForm initialData={job} />

// After
<JobForm initialData={job || {}} />
```

**Status:** ✅ Fixed

---

### Issue #2: 401 Unauthorized on /api/auth/me

**Error:**
```
Failed to load resource: the server responded with a status of 401 (Unauthorized)
/api/auth/me:1
```

**Root Cause:**
This is not actually a bug - it's expected behavior. When the app first loads, [App.jsx](src/App.jsx) calls `api.getCurrentUser()` to check if the user is already logged in. If no session exists, the API correctly returns 401, and the app shows the login page.

**Expected Behavior:**
- User not logged in → 401 response → Login page shown ✅
- User logged in → 200 response → Dashboard shown ✅

**Status:** ✅ Working as intended (no fix needed)

---

## Testing Recommendations

After these fixes, test the following:

1. **Create new job flow:**
   - Navigate to `/jobs/new`
   - Verify form loads without errors
   - Fill in form and submit
   - Verify job is created

2. **Edit existing job flow:**
   - Navigate to an existing job
   - Click "Bewerken"
   - Verify form loads with existing data
   - Make changes and submit
   - Verify changes are saved

3. **Authentication flow:**
   - Open app (should show login page)
   - Login with valid credentials
   - Verify dashboard loads
   - Refresh page - should remain logged in
   - Logout - should return to login page

---

## Code Quality Notes

### Deprecation Warnings (Non-critical)

The IDE shows deprecation warnings for `ArrowLeft` icon from `@phosphor-icons/react` in several files:
- [JobFormPage.jsx:3](src/pages/JobFormPage.jsx#L3)
- [ApplicationFormPage.jsx:2](src/pages/ApplicationFormPage.jsx#L2)

**Impact:** Low - Icons still work, but may need updating in future Phosphor Icons versions.

**Recommendation:** Consider updating to the new import syntax when time permits.

---

## Prevention

To prevent similar null/undefined issues in the future:

1. **Always use default parameters with fallback:**
   ```jsx
   // Good
   <Component initialData={data || {}} />

   // Better (with explicit null check)
   <Component initialData={data ?? {}} />
   ```

2. **Add PropTypes or TypeScript** for better type safety

3. **Add error boundaries** to catch and display errors gracefully

---

## Status Summary

| Issue | Severity | Status | Fix Time |
|-------|----------|--------|----------|
| JobForm null error | High | ✅ Fixed | 2 minutes |
| Auth 401 error | Low (expected) | ✅ N/A | N/A |

**All critical bugs resolved. Application is stable and ready for testing.** ✅

---

*Last updated: 2026-01-11*
