// StartPage.jsx

import React, { useEffect, useState } from 'react';
import Bar from './Bar';
import { Link } from 'react-router-dom';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import image1 from '../img/Sun.png';
import image2 from '../img/StartPage2.jpg';
import image5 from '../img/image5.png';
import chatimg from '../img/startchat.png';
import '../css/startchat.css';



const AllContainer  = styled.div`
background: linear-gradient(to bottom, rgba(255, 245, 245, 0.562) 20%, rgba(255, 255, 224, 0.676) 60%, rgba(255, 245, 245, 0.562) 150%);

`;

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

  h1 {
    margin: 5px;
    font-size: 36px;

    font-family: 'Open Sans', sans-serif;
  }
`;

/*왼쪽에서 오른쪽으로 페이드 인 애니메이션 */
const fadeInLeft = keyframes` 
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

/*오른쪽에서 왼쪽으로 페이드 인 애니메이션 */
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

/*아래에서 위로 페이드 인 애니메이션 */
const fadeInBottom = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

/* 위에서 아래로 페이드 인 애니메이션을 정의 */
const fadeInTop = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.div`
  height: 100vh;
  width: 97%; 
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  position: relative;

  &.visible {
    opacity: 1;
  }

  &::before {
    content: "";
    position: absolute;
    top: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% + 4px);
    height: 3px;
    background-color: #3a4f2cd3;
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -2px;
    width: 2px;
    height: 100%;
    background-color: #DFF0D8;
    z-index: -1;
  }

  img {
    width: 1000px; /* 고정 너비 설정 /
    height: 650px; / 고정 높이 설정 */
    margin-top: 10px;
    opacity: 0.5;
    box-shadow: 0px 10px 20px rgba(255, 255, 255, 0.8);
    transition: opacity 2s ease-in-out;
  }

  &#section1 {
    display: flex;
    align-items: flex-start;
    padding-left: 20px;
    position: relative;

     &.visible {
        .left-image {  
            opacity: 0.8;  /* 왼쪽 이미지의 불투명도 */
            animation: ${fadeInLeft} 1.2s;  /* 왼쪽에서 오른쪽으로 애니메이션, 1.2초 유지 */
        }

        .right-image {  
            opacity: 0.8;  /* 오른쪽 이미지의 불투명도 */
            animation: ${fadeInRight} 1.2s;  /* 오른쪽에서 왼쪽으로 애니메이션, 1.2초 유지 */
        }
        h1 {
        opacity: 1;
        animation: ${fadeInLeft} 1.2s; /* 왼쪽에서 오른쪽으로 애니메이션 추가 */
        }

        p {
        opacity: 1;
        animation: ${fadeInRight} 1.2s;
        }
    }

    h1 {
      position: absolute;
      z-index: 1;
      color: #5D5D5D; /* 텍스트 색상 설정 */
      text-align: center; /* 가운데 정렬 */
      top: 165px; /* 상단 여백 설정 */
    }

    p {
      z-index: 1; /* 텍스트가 이미지 위에 표시되도록 설정 */
      position: absolute;
      color: #5D5D5D; /* 텍스트 색상 설정 */
      font-size: 30px;
    }
  }


  &#section2 {
    align-items: flex-end;
    padding-right: 20px;

    &.visible img {    
      position: absolute;
      top: 40px; /* 이미지를 아래로 20px 이동 */
      width: 97%; /* 이미지의 너비를 부모 요소의 100%로 설정 */
      height: 70%; /* 이미지의 높이를 자동으로 조절 */   
    }

    h1, p, h2, h6 {
      z-index: 1; /* 텍스트가 이미지 위에 표시되도록 설정 */
      position: absolute;
      animation: ${fadeInTop} 3s;
    }
    
    h2 {
      z-index: 1; /* 텍스트가 이미지 위에 표시되도록 설정 */
      position: absolute;
      animation: ${fadeInTop} 3s;
    }


    h1 {
      top : 30px;
    }

    p {
      background-color: rgba(161, 98, 111, 0.7); /* A1626F 베이지색 반투명한 배경색 */
      padding: 25px;
      border-radius: 30px; /* 동그란 테두리 */
      margin: 20px 30px; /* 상하 20px, 좌우 30px */
      top : 220px;
      fontFamily: 'Noto Sans KR, sans-serif';
    }

    h3 {
      background-color: rgba(255, 255, 255, 0.7); /* 하얀색 반투명한 배경색 */
      padding: 10px;
      border-radius: 30px; /* 동그란 테두리 */
      top : 220px;
    }

  }

  
  

  &#section3 {

    
    display: flex; /* Flexbox 사용 */
    flex-direction: column; /* 세로 방향으로 정렬 */
    align-items: center; /* 가운데 정렬로 변경 */
    justify-content: center; /* 수직 가운데 정렬 */
    padding-left: 20px;
    padding: 20px; /* 전체 패딩 추가 */
    border: 1px solid #ccc; /* 테두리 추가 */
    border-radius: 5px; /* 모서리 둥글게 */


    .hover-span {
      background-color: #ffffff8d; /* 반투명 배경 */
      margin-right: 20px;
      padding: 10px;
      transition: background-color 0.3s;
      border-radius: 4px; /* 둥근 모서리 */
      }
    
    .hover-span:hover {
      background-color: #ffffff;
    }

    .post {
      width: 80%; /* 게시글 너비 설정 */
      padding: 10px; /* 게시글 패딩 */
      border-bottom: 1px solid #eee; /* 게시글 구분선 */
  }

    .post:last-child {
      border-bottom: none; /* 마지막 게시글 구분선 제거 */

`;


// Styled Link 컴포넌트 생성
const StyledLink = styled(Link)`
  display: block; /* 블록 요소로 설정하여 전체 영역 클릭 가능 */
  background-color: rgba(161, 98, 111, 0.7); /* A1626F 베이지색 반투명한 배경색 */
  padding: 25px;
  border-radius: 30px; /* 동그란 테두리 */
  margin: 20px 30px; /* 상하 20px, 좌우 30px */
  width: 300px; /* 원하는 너비 설정 (예: 300px) */
  position: absolute;
  top: 750px; /* 원래 위치 유지 */
  left: 49%;
  transform: translateX(-50%); /* 가운데 정렬 */
  font-family: 'Noto Sans KR', sans-serif; /* 폰트 설정 */
  font-size: 20px; /* 글씨 크기 설정 (예: 24px) */
  text-align: center; /* 텍스트 가운데 정렬 */
  text-decoration: none; /* 기본 링크 스타일 제거 */
  color: white; /* 텍스트 색상 */
  z-index: 1; /* 이미지 위에 표시되도록 설정 */
`;

const FadeInContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  animation: ${({ isVisible }) => (isVisible ? 'fadeIn 1s ease-in-out' : 'none')};
`;

const FadeInImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 90%;
  overflow: hidden;
  animation: ${({ isVisible }) => (isVisible ? 'fadeIn 1.5s ease-in-out' : 'none')};
`;

const FadeInImage = styled.img`
  max-width: 100%;
  height: auto;
  animation: ${({ isVisible }) => (isVisible ? 'fadeIn 2.0s ease-in-out' : 'none')};
`;

// 애니메이션 정의
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

function StartPage() {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
    const [selectedPost, setSelectedPost] = useState(null); // 선택한 게시글 상태
    const [showModal, setShowModal] = useState(false);
    const [selectedPostIndex, setSelectedPostIndex] = useState(null);
    const currentPosts = []; // 실제 게시글 데이터로 교체
    const [title, setTitle] = useState(""); // 제목 상태
    const [content, setContent] = useState(""); // 내용 상태
    const [posts, setPosts] = useState([]); // 게시글 목록 상태


    const totalPosts = currentPosts.length;
    const postsPerPage = 10; // 페이지당 게시글 수
    const totalPages = Math.ceil(totalPosts / postsPerPage); // 총 페이지 수 계산

    const [isVisible, setIsVisible] = useState(false);

    // 초기 렌더링 시 localStorage에서 token 확인
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
          setToken(storedToken);
          setIsLoggedIn(true);
      } else {
          setIsLoggedIn(false);
      }
    }, []);

    // token이 변경될 때마다 localStorage와 isLoggedIn 상태 업데이트
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            setIsLoggedIn(true);
        } else {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
        }
    }, [token]);

    useEffect(() => {
      const observerOptions = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1
      };

      const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  setIsVisible(true);
              }
          });
      }, observerOptions);

      const target = document.querySelector('.start-page-container');
      if (target) {
          observer.observe(target);
      }

      return () => {
          if (target) {
              observer.unobserve(target);
          }
      };
  }, []);



  // 페이지 번호 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePostClick = (index) => {
    setSelectedPostIndex(index);
    setTitle(posts[index].title); // 모달 열 때 제목 세팅
    setContent(posts[index].content); // 모달 열 때 내용 세팅
    setShowModal(true); // 모달 열기
    };

  const handleAddPost = () => {
        setShowModal(true);
        setTitle(""); // 모달 열 때 제목 초기화
        setContent(""); // 모달 열 때 내용 초기화
        setSelectedPostIndex(null); // 새 게시글 추가를 위한 초기화
    };

    const handleDelete = () => {
        if (selectedPostIndex !== null) {
            const updatedPosts = posts.filter((_, index) => index !== selectedPostIndex);
            setPosts(updatedPosts);
            setShowModal(false); // 모달 닫기
            setSelectedPostIndex(null); // 선택 초기화
        }
    };

    const handleSave = () => {
        if (title.trim() === "" || content.trim() === "") {
            alert("제목과 내용을 입력하세요!"); // 제목과 내용이 비어있을 경우 경고 메시지
            return;
        }
    
        if (selectedPostIndex !== null) {
            // 게시글 수정
            const updatedPosts = [...posts];
            updatedPosts[selectedPostIndex] = {
                ...updatedPosts[selectedPostIndex],
                title,
                content,
            };
            setPosts(updatedPosts);
        } else {
            // 새 게시글 추가
            const newPost = {
                title,
                content,
                author: "작성자", // 실제 작성자 정보로 변경 가능
                createdAt: new Date().toLocaleString(),
            };
            setPosts([newPost, ...posts]); // 새 게시글을 배열의 맨 앞에 추가
        }
    
        setShowModal(false); // 모달 닫기
        setTitle(""); // 제목 초기화
        setContent(""); // 내용 초기화
    };



  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    document.addEventListener("DOMContentLoaded", () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // 애니메이션 1회만 실행
          }
        });
      });
    
      document.querySelectorAll(".start-page-container").forEach((element) => {
        observer.observe(element);
      });
    });
    

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

    return (
        <>
            <AllContainer>
                <GlobalStyle />
                <Bar isLoggedIn={isLoggedIn} setToken={setToken} />
                <Section className="section" id="section1">
                    <h1 style={{ top: '160px', fontSize: '40px', fontWeight: 'normal', fontStyle: 'italic' }}>Promotion and planning</h1>
                    <h1 style={{ top: '230px', marginLeft: '350px', fontSize: '55px', fontStyle: 'italic' }}>In Beauty Sync</h1>

                    <div style={{ display: 'flex', overflow: 'hidden', maxWidth: '100%', whiteSpace: 'nowrap' }}>
                        <img src={image1} alt="Image 1" className="left-image" style={{ width: '1300px', height: '600px', objectFit: 'cover', marginRight: '200px' }} />
                        <img src={image5} alt="Image 2" className="right-image" style={{ width: '500px', height: '600px', objectFit: 'cover', marginRight: '0px' }} />
                    </div>

                    <p style={{ position: 'absolute', right: '70px', top: '170px', fontSize: '50px' }}>
                        <span style={{ fontSize: '48px', color: '#072715d5', fontFamily: '"Noto Serif KR", serif', writingMode: 'vertical-rl', transform: 'rotate(0deg)', whiteSpace: 'nowrap' }}>
                            뷰티 홍보 기획 서비스
                        </span>
                    </p>

                    
                    <p style={{ position: 'absolute', right: '160px', top: '280px', fontSize: '30px' }}>
                    <span style={{ fontSize: '30px', color: '#1f4e33b0', fontFamily: 'Noto Sans KR, sans-serif' }}>
                        " </span>
                    </p>
                    <p style={{ position: 'absolute', right: '150px', top: '310px', fontSize: '30px' }}>
                    <span style={{ fontSize: '25px', color: '#1f4e33b0', fontFamily: '"Noto Serif KR", serif', writingMode: 'vertical-rl', transform: 'rotate(0deg)', whiteSpace: 'nowrap' }}>
                        당 신 의  브 랜 드 를  빛 나 게 할 솔 루 션 </span>
                    </p>
                    <p style={{ position: 'absolute', right: '156px', top: '770px', fontSize: '30px' }}>
                    <span style={{ fontSize: '30px', color: '#1f4e33b0', fontFamily: 'Noto Sans KR, sans-serif' }}>
                        " </span>
                    </p>

                </Section>

                <Section className="section" id="section2">
                    <h1 style={{ fontSize: '80px', right: '700px', marginTop: '70px', fontStyle: 'italic', color: '#A1626F' }}>Why?</h1>
                    <h1 style={{ marginTop: '200px', right: '520px' }}>Beauty Sync와 함께 해야 하는 이유</h1>

                    <h2 style={{ position: 'absolute',  left: '830px', top: '400px'}}>첫째,</h2>
                    <h2 style={{ position: 'absolute',  left: '430px', top: '450px' }}>Beauty Sync은  <span style={{ textDecoration: 'underline', color: '#78172C' }}>효율적인 기획 및 이벤트 홍보</span> 를 효율적으로 진행할 수 있습니다.</h2>
                    
                    <h2 style={{ position: 'absolute',  left: '830px', top: '570px' }}>둘째,</h2>
                    <h2 style={{ position: 'absolute',  left: '530px', top: '620px' }}>Beauty Sync은 제품들을<span style={{  textDecoration: 'underline', color: '#78172C' }}> 효과적으로 홍보</span>할 수 있습니다.</h2>
                    
                    <StyledLink to="/taskui">
                         나만의 홍보 기획안 만들기
                    </StyledLink>                    
                    <img src={image2} alt="Image 2" />          
                </Section>

                
            <FadeInContainer className="start-page-container" isVisible={isVisible}>
              <FadeInImageContainer className="start-page-image-container" isVisible={isVisible}>
                  <FadeInImage src={chatimg} alt="chat" className="start-page-image" isVisible={isVisible} />
                </FadeInImageContainer>
            </FadeInContainer>
  
            </AllContainer>
        </>
    );
}

export default StartPage;
