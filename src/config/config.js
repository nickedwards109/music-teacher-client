// Replace 'scheme://hostname:port' with the scheme, hostname, and port of your
// backend API endpoints.
//
// In development, this could be 'http://localhost:3000'
//
// In production, with endpoints integrated in Amazon API gateway, this could
// default to port 443 on something like 'https://my-api-id.execute-api.region-id.amazonaws.com'

const authenticationURL = 'scheme://hostname:port/api/v1/sessions';
const adminDashboardURL = 'scheme://hostname:port/api/v1/admin/dashboard';
const teacherDashboardURL = 'scheme://hostname:port/api/v1/teacher/dashboard'
const studentDashboardURL = 'scheme://hostname:port/api/v1/student/dashboard';
const studentsIndexURL = 'scheme://hostname:port/api/v1/students';
const sendNewUserEmailURL = 'scheme://hostname:port/api/v1/send-new-user-email';
const setPasswordURL = 'scheme://hostname:port/api/v1/set-password';
const initiatePasswordResetURL = 'scheme://hostname:port/api/v1/initiate-password-reset';
const resetPasswordURL = 'scheme://hostname:port/api/v1/reset-password';
const presignedUploadURL = 'scheme://hostname:port/api/v1/presigned-upload-url';
const createLessonURL = 'scheme://hostname:port/api/v1/lessons';
const showLessonBaseURL = 'scheme://hostname:port/api/v1/lessons';
const lessonsIndexURL = 'scheme://hostname:port/api/v1/lessons';
const createAssignmentURL = 'scheme://hostname:port/api/v1/assignments';
const assignmentsIndexURL = 'scheme://hostname:port/api/v1/assignments'

export {
  authenticationURL,
  adminDashboardURL,
  teacherDashboardURL,
  studentDashboardURL,
  sendNewUserEmailURL,
  setPasswordURL,
  initiatePasswordResetURL,
  resetPasswordURL,
  presignedUploadURL,
  createLessonURL,
  showLessonBaseURL,
  lessonsIndexURL,
  studentsIndexURL,
  createAssignmentURL,
  assignmentsIndexURL
}
