export default (error) =>{
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("PERMISSION_DENIED : 사용자가 위치 정보 요청을 거부했습니다.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("POSITION_UNAVAILABLE : 위치 정보를 사용할 수 없습니다.");
        break;
      case error.TIMEOUT:
        alert("TIMEOUT : 사용자 위치를 가져오는 요청이 시간 초과되었습니다.");
        break;
      case error.UNKNOWN_ERROR:
        alert("UNKNOWN_ERROR : 알 수 없는 오류가 발생했습니다.");
        break;
      default:
        alert("알 수 없는 오류가 발생했습니다.");
        break;
    }
  };