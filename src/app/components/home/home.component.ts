import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  selectedButton = 1;

  @ViewChild('buttonElement') buttonElement!: ElementRef;

  stop: any;

  message: any;

  name: any;

  email: any;

  phone: any;

  /** for generating circles using d3 */
  @ViewChild('circleContainer') circleContainer!: ElementRef;

  slideConfigItemWithoutArrows = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    dots: true,
    speed: 1500,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // slideConfigItemWithArrows = {
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   infinite: true,
  //   autoplay: true,
  //   autoplaySpeed: 1000,
  //   dots: false,
  //   speed: 1500,
  //   arrows: true, // Show arrows
  //   responsive: [
  //     {
  //       breakpoint: 600,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 1050,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //       },
  //     },
  //   ],
  //   prevArrow: `<button type="button" style='border: none; margin-left: 100px; transform: rotate(180deg); background: none' class="slick-prev"><svg width="38" height="60" viewBox="0 0 38 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <g filter="url(#filter0_d_196_309)">
  //   <path d="M32.4749 28.4749C33.8417 27.108 33.8417 24.892 32.4749 23.5251L10.201 1.25126C8.83418 -0.115572 6.6181 -0.115572 5.25126 1.25126C3.88443 2.6181 3.88443 4.83418 5.25126 6.20101L25.0503 26L5.25126 45.799C3.88443 47.1658 3.88443 49.3819 5.25126 50.7487C6.6181 52.1156 8.83418 52.1156 10.201 50.7487L32.4749 28.4749ZM26 29.5H30V22.5H26V29.5Z" fill="#ACACAC"/>
  //   </g>
  //   <defs>
  //   <filter id="filter0_d_196_309" x="0.226196" y="0.226074" width="37.2738" height="59.5479" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  //   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  //   <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //   <feOffset dy="4"/>
  //   <feGaussianBlur stdDeviation="2"/>
  //   <feComposite in2="hardAlpha" operator="out"/>
  //   <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  //   <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_196_309"/>
  //   <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_196_309" result="shape"/>
  //   </filter>
  //   </defs>
  //   </svg>
  //   </button>`,
  //   nextArrow: `<button type="button" style='border: none; margin-right: 100px; background: none' class="slick-next"><svg width="38" height="60" viewBox="0 0 38 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  //   <g filter="url(#filter0_d_196_309)">
  //   <path d="M32.4749 28.4749C33.8417 27.108 33.8417 24.892 32.4749 23.5251L10.201 1.25126C8.83418 -0.115572 6.6181 -0.115572 5.25126 1.25126C3.88443 2.6181 3.88443 4.83418 5.25126 6.20101L25.0503 26L5.25126 45.799C3.88443 47.1658 3.88443 49.3819 5.25126 50.7487C6.6181 52.1156 8.83418 52.1156 10.201 50.7487L32.4749 28.4749ZM26 29.5H30V22.5H26V29.5Z" fill="#ACACAC"/>
  //   </g>
  //   <defs>
  //   <filter id="filter0_d_196_309" x="0.226196" y="0.226074" width="37.2738" height="59.5479" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
  //   <feFlood flood-opacity="0" result="BackgroundImageFix"/>
  //   <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
  //   <feOffset dy="4"/>
  //   <feGaussianBlur stdDeviation="2"/>
  //   <feComposite in2="hardAlpha" operator="out"/>
  //   <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
  //   <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_196_309"/>
  //   <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_196_309" result="shape"/>
  //   </filter>
  //   </defs>
  //   </svg>
  //   </button>`,
  // };
  // testimonials: any = [
  //   {
  //     cName: 'Mohib Jahangir',
  //     companyName: 'Company Name',
  //     Image: './assets/images/clientImg.jpg',
  //     desig: 'Designation',
  //     starsArray: [1, 1, 1, 1, 1],
  //     desc: `"I recently hired Innovinci to develop a custom software solution for my business, and I couldn't be happier with the results. The team at Innovinci was highly professional and skilled. They took the time to understand my requirements and delivered a high-quality, user-friendly software that perfectly matched my needs. The communication throughout the project was excellent, and they were always available to address any concerns or make necessary adjustments. I highly recommend this software house for any software development needs."`,
  //   },
  //   {
  //     cName: 'Kashif Riaz',
  //     Image: './assets/images/clientImg.jpg',
  //     companyName: 'Company Name',
  //     desig: 'Designation',
  //     starsArray: [1, 1, 1, 1],
  //     desc: `"The software house I collaborated with exceeded my expectations in every way. From the initial consultation to the final product delivery, they demonstrated expertise and commitment to excellence. The team was responsive, proactive, and highly skilled in developing complex software solutions. They went above and beyond to ensure that the software was tailored to my specific requirements and delivered on time. Working with Innovinci was a pleasure, and I would not hesitate to work with them again in the future."`,
  //   },
  //   {
  //     cName: 'Syed Muhammad Ahmed',
  //     Image: './assets/images/clientImg.jpg',
  //     companyName: 'Company Name',
  //     desig: 'Designation',
  //     starsArray: [1, 1, 1, 1],
  //     desc: `"I approached Innovinci to revamp my outdated software, and it turned out to be a fantastic decision.  Innovinci has a highly talented team of developers who quickly understood my vision and transformed it into a modern, efficient software solution. They meticulously tested the software to ensure its reliability and functionality. The level of professionalism and attention to detail displayed by the software house was impressive. I'm extremely satisfied with the outcome and would highly recommend their services to anyone seeking top-notch software development."`,
  //   },
  //   {
  //     Image: './assets/images/clientImg.jpg',
  //     cName: 'Hamza Ijaz',
  //     companyName: 'Company Name',
  //     desig: 'Designation',
  //     starsArray: [1, 1, 1, 1],
  //     desc: `"Choosing the right software house was crucial for the success of my software project, and I'm glad I found the perfect match. The software house I collaborated with was highly professional, efficient, and reliable. They had a deep understanding of my industry and were able to develop a tailored software solution that addressed our unique business requirements. The team's attention to detail and commitment to delivering a high-quality product were remarkable. I'm extremely satisfied with the outcome and would not hesitate to engage their services again in the future." `,
  //   },
  // ];

  ourClients: any = [
    {
      img: '../../../assets/images/MAKR.png',
    },
    {
      img: '../../../assets/images/Maria.png',
    },
    {
      img: '../../../assets/images/MIC2.png',
    },
    {
      img: '../../../assets/images/New Project (2).png',
    },
    {
      img: '../../../assets/images/New Project.png',
    },
    {
      img: '../../../assets/images/suksshi2.png',
    },
  ];

  data = [
    ['Trello', 'Jira', 'Slack', 'Asana', 'Notion'],
    [
      'HTML',
      'CSS',
      'SASS',
      'Python',
      'Java',
      'Angular',
      'C#.Net',
      'React',
      'Vue',
      'Jquery',
      'NodeJS',
      'GoLang',
    ],
    [
      'Jasmine',
      'Mocha',
      'Unit Testing',
      'Cucumber',
      'Protractor',
      'Cypress',
      'Appium',
      'E2E Testing',
      'JUnit',
      'Jest',
    ],
    ['IOS', 'Android', 'React Native', 'Ionic'],
    ['AWS', 'GCP', 'Cloud Migration', 'Azure'],
    ['Figma', 'Marvel', 'Adobe XD', 'Hotjar'],
  ];

  coordinates: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.autoClickButton();
  }

  ngAfterViewInit(): void {
    this.createCircles();
    this.onButtonClick(1);

    const svgs = document.querySelectorAll<SVGElement>('#svg-container svg');
    let previousSvg: SVGElement | null = null;
    let highlightedCount = 0;
    let isPaused = false;
    let timeoutId: NodeJS.Timeout | undefined = undefined;

    function highlightSvg() {
      if (!isPaused) {
        if (previousSvg) {
          previousSvg.classList.remove('auto-animate');
        }
        svgs[highlightedCount].classList.add('auto-animate');
        previousSvg = svgs[highlightedCount];
        highlightedCount++;

        if (highlightedCount >= svgs.length) {
          highlightedCount = 0;
        }
        timeoutId = setTimeout(highlightSvg, 1200);
      }
    }

    function pauseLoop() {
      isPaused = true;
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = undefined;
      }
    }

    function resumeLoop() {
      isPaused = false;
      if (!timeoutId) {
        timeoutId = setTimeout(highlightSvg, 1200);
      }
    }

    highlightSvg();

    for (let i = 0; i < svgs.length; i++) {
      svgs[i].addEventListener('mouseenter', function () {
        if (previousSvg && previousSvg !== this) {
          previousSvg.classList.remove('auto-animate');
        }
        pauseLoop();
      });

      svgs[i].addEventListener('mouseleave', function () {
        resumeLoop();
      });
    }
  }

  autoClickButton() {
    let isAnimationRunning = true;

    // Function to start the animation
    const startAnimation = () => {
      this.stop = setInterval(() => {
        let nextButtonNumber = (this.selectedButton % 6) + 1;
        this.onButtonClick(nextButtonNumber);
      }, 2500);
      isAnimationRunning = true;
    };

    // Function to stop the animation
    const stopAnimation = () => {
      clearInterval(this.stop);
      isAnimationRunning = false;
    };

    // Start the animation
    startAnimation();

    // Add click event listener to each button to stop auto-clicking
    for (let i = 1; i <= 6; i++) {
      let button: any = document.getElementById(`${i}`);
      button.addEventListener('click', () => {
        stopAnimation();
      });
    }

    //event listener to start auto-clicking when the user scrolls outside of the services section
    window.addEventListener('scroll', () => {
      let servicesSection: any = document.getElementById('services');
      let rect: any = servicesSection.getBoundingClientRect();
      if (
        rect.top >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight)
      ) {
        // it the services section is in view do nothing
      } else {
        if (!isAnimationRunning) {
          startAnimation();
        }
      }
    });

    //click event listener to resume auto-clicking when the user clicks outside of the services section
    window.addEventListener('click', (event) => {
      let servicesSection: any = document.getElementById('services');
      if (!servicesSection.contains(event.target)) {
        if (!isAnimationRunning) {
          startAnimation();
        }
      }
    });
  }

  onButtonClick(buttonNumber: number) {
    this.selectedButton = buttonNumber;
    let j = -1;
    // Set opacity of circle groups
    for (let i = 1; i <= 6; i++) {
      const circleGroup = d3
        .select(this.circleContainer.nativeElement)
        .select(`#circle-group-${i}`);
      circleGroup.style('opacity', buttonNumber === i ? 1 : 0.3);

      // Apply bounce animation on circles
      circleGroup
        .selectAll('circle')
        .transition()
        .duration(500)
        .attr('r', (d) => {
          if (buttonNumber === i) {
            j = j + 1;
            return this.coordinates[j].r + 5;
          } else {
            j = j + 1;
            return this.coordinates[j].r - 10;
          }
        });

      circleGroup
        .selectAll('text')
        .transition()
        .duration(500)
        .style('opacity', (d, index) => {
          if (buttonNumber === i) {
            return 1;
          } else {
            return 0.5;
          }
        })
        .style('font-size', (d, index) => {
          if (buttonNumber === i) {
            if (window.screen.width > 600) {
              return '16px';
            } else {
              return '22px';
            }
          } else {
            return '13px';
          }
        });
    }
  }

  createCircles() {
    // Define the color scale
    const colors = ['#E2E0E3', '#777777', '#D9D9D9', '#373737'];
    let container, circleGroups;
    if (window.screen.width < 600) {
      this.coordinates = [
        { cx: 80, cy: 30, r: 30 }, //Trello
        { cx: 600, cy: 100, r: 30 }, //Jira
        { cx: 900, cy: 300, r: 35 }, //Slack
        { cx: 1000, cy: 90, r: 40 }, //Asana
        { cx: 350, cy: 200, r: 35 }, //Notion
        { cx: 200, cy: 50, r: 35 }, //HTML
        { cx: 320, cy: 100, r: 25 }, //CSS
        { cx: 370, cy: 280, r: 40 }, //SASS
        { cx: 900, cy: 200, r: 40 }, //Python
        { cx: 900, cy: 50, r: 30 }, //'Java',
        { cx: 1100, cy: 150, r: 40 }, //'Angular',
        { cx: 350, cy: 350, r: 40 }, //'C#.Net',
        { cx: 1100, cy: 50, r: 35 }, // 'React',
        { cx: 630, cy: 40, r: 30 }, //'Vue',
        { cx: 100, cy: 160, r: 40 }, //'Jquery',
        { cx: 900, cy: 350, r: 45 }, //'NodeJS',
        { cx: 650, cy: 170, r: 45 }, //'GoLang',
        { cx: 150, cy: 350, r: 45 }, //Jasmine
        { cx: 400, cy: 450, r: 35 }, //Mocha
        { cx: 150, cy: 220, r: 60 }, //Unit Testing
        { cx: 850, cy: 250, r: 50 }, //Cucumber
        { cx: 450, cy: 150, r: 55 }, //Protractor
        { cx: 1100, cy: 250, r: 40 }, //Cypress
        { cx: 550, cy: 350, r: 45 }, //Appium
        { cx: 450, cy: 50, r: 60 }, //E2E
        { cx: 780, cy: 70, r: 35 }, //JUnit
        { cx: 800, cy: 130, r: 25 }, //Jest
        { cx: 250, cy: 150, r: 30 }, //IOS
        { cx: 150, cy: 290, r: 40 }, //Android
        { cx: 1000, cy: 440, r: 65 }, //REACT Native
        { cx: 700, cy: 350, r: 35 }, //Ionic
        { cx: 680, cy: 450, r: 40 }, //AWS
        { cx: 550, cy: 400, r: 40 }, //GCP
        { cx: 600, cy: 270, r: 80 }, //Cloud Migration
        { cx: 1100, cy: 310, r: 25 }, //Azure
        { cx: 750, cy: 30, r: 35 }, //Figma
        { cx: 1100, cy: 380, r: 40 }, //Marvel
        { cx: 120, cy: 100, r: 55 }, //Adobe Xd
        { cx: 180, cy: 450, r: 40 }, //HotJar
      ];

      // select the container element
      container = d3
        .select(this.circleContainer.nativeElement)
        .append('svg')
        .attr('viewBox', '0 0 600 800')
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('width', '100%')
        .attr('height', '100%');

      //circle groups
      circleGroups = container
        .selectAll('g')
        .data(this.data)
        .enter()
        .append('g')
        .attr('id', (d, i) => `circle-group-${i + 1}`);
      // .attr('transform', (_, i) => `translate(0,${i * 125})`);
    } else {
      this.coordinates = [
        { cx: 50, cy: 50, r: 25 }, //Trello
        { cx: 600, cy: 80, r: 30 }, //Jira
        { cx: 1000, cy: 80, r: 45 }, //Slack
        { cx: 1000, cy: 300, r: 25 }, //Asana
        { cx: 350, cy: 200, r: 35 }, //Notion
        { cx: 150, cy: 60, r: 35 }, //HTML
        { cx: 350, cy: 90, r: 25 }, //CSS
        { cx: 470, cy: 200, r: 40 }, //SASS
        { cx: 800, cy: 200, r: 25 }, //Python
        { cx: 900, cy: 50, r: 25 }, //'Java',
        { cx: 1000, cy: 200, r: 35 }, //'Angular',
        { cx: 110, cy: 400, r: 40 }, //'C#.Net',
        { cx: 1100, cy: 50, r: 25 }, // 'React',
        { cx: 750, cy: 440, r: 30 }, //'Vue',
        { cx: 300, cy: 420, r: 40 }, //'Jquery',
        { cx: 800, cy: 340, r: 35 }, //'NodeJS',
        { cx: 600, cy: 200, r: 35 }, //'GoLang',
        { cx: 150, cy: 180, r: 35 }, //Jasmine
        { cx: 270, cy: 50, r: 35 }, //Mocha
        { cx: 70, cy: 300, r: 45 }, //Unit Testing
        { cx: 850, cy: 250, r: 40 }, //Cucumber
        { cx: 280, cy: 280, r: 40 }, //Protractor
        { cx: 1100, cy: 200, r: 30 }, //Cypress
        { cx: 470, cy: 400, r: 35 }, //Appium
        { cx: 480, cy: 70, r: 45 }, //E2E
        { cx: 800, cy: 100, r: 35 }, //JUnit
        { cx: 700, cy: 150, r: 25 }, //Jest
        { cx: 250, cy: 150, r: 30 }, //IOS
        { cx: 420, cy: 300, r: 35 }, //Android
        { cx: 910, cy: 170, r: 50 }, //REACT Native
        { cx: 600, cy: 400, r: 35 }, //Ionic
        { cx: 900, cy: 350, r: 40 }, //AWS
        { cx: 550, cy: 280, r: 40 }, //GCP
        { cx: 700, cy: 280, r: 60 }, //Cloud Migration
        { cx: 725, cy: 50, r: 25 }, //Azure
        { cx: 1000, cy: 430, r: 30 }, //Figma
        { cx: 1100, cy: 320, r: 40 }, //Marvel
        { cx: 60, cy: 150, r: 45 }, //Adobe Xd
        { cx: 200, cy: 350, r: 40 }, //HotJar
      ];
      // select the container element
      container = d3
        .select(this.circleContainer.nativeElement)
        .append('svg')
        .attr('height', 'inherit')
        .attr('width', 'inherit');
      // .attr('viewBox', `0 0 1200 ${window.innerHeight - 250}`)
      // .attr('preserveAspectRatio', 'xMidYMid meet');

      //circle groups
      circleGroups = container
        .selectAll('g')
        .data(this.data)
        .enter()
        .append('g')
        .attr('id', (d, i) => `circle-group-${i + 1}`);
      // .attr('transform', (_, i) => `translate(${i * 200}, 0)`);
    }

    const flattenData = this.data.reduce((acc, curr) => acc.concat(curr), []); // Flatten the nested data array

    const totalElements = flattenData.length; // Get the total number of elements

    // console.log(totalElements);

    const circles = circleGroups
      .selectAll('circle')
      .data((d, groupIndex) => {
        const startIndex = groupIndex * this.data[groupIndex].length;
        return d.map((item, index) => ({
          data: item,
          groupIndex,
          index: startIndex + index,
          totalElements: totalElements,
        }));
      })
      .enter()
      .append('circle')
      .attr('cx', (d, i) => {
        const groupLengths = this.data.map((group) => group.length);
        const groupOffsets = groupLengths.reduce(
          (acc, length, index) => {
            acc[index + 1] = acc[index] + length;
            return acc;
          },
          [0]
        );

        const groupIndex = d.groupIndex;
        const groupOffset = groupOffsets[groupIndex];
        const dataIndex = groupOffset + i;
        return (this.coordinates[dataIndex].cx / 1200) * 100 + '%';
      })
      .attr('cy', (d, i) => {
        const groupLengths = this.data.map((group) => group.length);
        const groupOffsets = groupLengths.reduce(
          (acc, length, index) => {
            acc[index + 1] = acc[index] + length;
            return acc;
          },
          [0]
        );

        const groupIndex = d.groupIndex;
        const groupOffset = groupOffsets[groupIndex];
        const dataIndex = groupOffset + i;
        return (this.coordinates[dataIndex].cy / 500) * 100 + '%';
      })
      .attr('r', (d, i) => {
        const groupLengths = this.data.map((group) => group.length);
        const groupOffsets = groupLengths.reduce(
          (acc, length, index) => {
            acc[index + 1] = acc[index] + length;
            return acc;
          },
          [0]
        );

        const groupIndex = d.groupIndex;
        const groupOffset = groupOffsets[groupIndex];
        const dataIndex = groupOffset + i;
        return this.coordinates[dataIndex].r;
      })
      .style('fill', (d, i) => {
        const groupLengths = this.data.map((group) => group.length);
        const groupOffsets = groupLengths.reduce(
          (acc, length, index) => {
            acc[index + 1] = acc[index] + length;
            return acc;
          },
          [0]
        );

        const groupIndex = d.groupIndex;
        const groupOffset = groupOffsets[groupIndex];
        const dataIndex = groupOffset + i;
        return colors[dataIndex % colors.length];
      })
      .style('opacity', 0.5);

    const texts = circleGroups
      .selectAll('text')
      .data((d, groupIndex) => {
        const startIndex = groupIndex * this.data[groupIndex].length;
        return d.map((item, index) => ({
          data: item,
          groupIndex,
          index: startIndex + index,
          totalElements: totalElements,
        }));
      })
      .enter()
      .append('text')
      .attr('x', (d, i) => {
        const groupLengths = this.data.map((group) => group.length);
        const groupOffsets = groupLengths.reduce(
          (acc, length, index) => {
            acc[index + 1] = acc[index] + length;
            return acc;
          },
          [0]
        );

        const groupIndex = d.groupIndex;
        const groupOffset = groupOffsets[groupIndex];
        const dataIndex = groupOffset + i;
        return (this.coordinates[dataIndex].cx / 1200) * 100 + '%';
      })
      .attr('y', (d, i) => {
        const groupLengths = this.data.map((group) => group.length);
        const groupOffsets = groupLengths.reduce(
          (acc, length, index) => {
            acc[index + 1] = acc[index] + length;
            return acc;
          },
          [0]
        );

        const groupIndex = d.groupIndex;
        const groupOffset = groupOffsets[groupIndex];
        const dataIndex = groupOffset + i;
        return (this.coordinates[dataIndex].cy / 500) * 100 + '%';
      })
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('font-family', 'Josefin Sans')
      .attr('font-size', '13px')
      .text((d) => d.data);
  }

  composeEmail = () => {
    if (this.validateForm()) {
      this.http
        .post(
          'https://mailthis.to/Success@innovincitech.com',
          {
            email: this.email,
            _subject: 'Get a Quote',
            message: `${this.message} Name : ${this.name} Phone Number : ${this.phone}`,
          },
          { responseType: 'text' }
        )
        .subscribe((abc: any) => {
          location.href = 'https://mailthis.to/confirm';
          this.name = '';
          this.email = '';
          this.phone = '';
          this.message = '';
        });

      // const encodedRecipientEmail = encodeURIComponent(
      //   'Success@innovincitech.com'
      // );
      // const encodedSubject = encodeURIComponent('Get a quote');
      // const encodedMessage = encodeURIComponent(this.message);
      // const gmailUrl = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${encodedRecipientEmail}&su=${encodedSubject}&body=${encodedMessage} + Name : ${this.name} + Phone Number : ${this.phone}`;
      // window.open(gmailUrl, '_blank');
    }
  };

  validateForm(): boolean {
    const nameRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phoneRegex = /^\s*\+?[\d\s-]{7,15}\s*$/;

    const trimmedName = this.name?.trim();
    const trimmedEmail = this.email?.trim();
    const trimmedPhone = this.phone?.trim();
    const trimmedMessage = this.message?.trim();

    if (!trimmedName || !nameRegex.test(trimmedName)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Name',
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Email',
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    if (!trimmedPhone || !phoneRegex.test(trimmedPhone)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Phone Number',
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }
    if (!trimmedMessage) {
      Swal.fire({
        icon: 'error',
        title: 'Empty Message',
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    }

    this.name = trimmedName;
    this.email = trimmedEmail;
    this.phone = trimmedPhone;
    this.message = trimmedMessage;

    return true;
  }
}
