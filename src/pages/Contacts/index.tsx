// import { FiSearch } from "react-icons/fi"
import { Container, Content, SidePanel, MainPanel, TitleHeader, ContainerCard, Pagination } from './styles';
import { Header } from '../../components/Header';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';
import Swal from 'sweetalert2';
import { FiBarChart, FiEdit, FiMessageCircle, FiPhoneOutgoing, FiUser } from 'react-icons/fi';
import { Loading } from '../../components/Loading';

export function Contacts() {
  const { token }: any = useParams();
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 7;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contacts.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers: any = [];
  const maxPageButtons = 10; // Limite de botões de página

  const renderPageNumbers = () => {
    const startIndex = Math.max(0, currentPage - Math.floor(maxPageButtons / 2));
    const endIndex = Math.min(startIndex + maxPageButtons, pageNumbers.length);
    return pageNumbers.slice(startIndex, endIndex).map((pageNumber: number) => (
      <button key={pageNumber} onClick={() => handlePageChange(pageNumber)} className={(pageNumber == currentPage) ? 'selected' : ''}>
        <h4>{pageNumber}</h4>
      </button>
    ));
  };

  for (let i = 1; i <= Math.ceil(contacts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  async function listContacts() {
    try {
      const response = await api.post(`/contacts/findAll/${token}`);
      if (response.data) {
        setContacts(response.data.contacts)
      }
      setIsLoading(false);
      return response.data.bots
    } catch (error: any) {
      if (error.response) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Não foi Possivel Listar os Bots",
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error)
      }
    }
  }
  useEffect(() => {
    listContacts()
  }, [token])
  useEffect(() => {
  }, [contacts])
  return (
    <Container>
      <Header />
      <main>
        <Content>
          <TitleHeader>
            <h1>CONTATOS</h1>
          </TitleHeader>
          <SidePanel>Side Panel</SidePanel>
          <MainPanel>
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                {currentItems.map((item: any, index) => (
                  <ContainerCard key={index}>
                    <div className='box1'>
                      <img src='https://imgdb.net/storage/uploads/987cc743c692d21ac0305b623920c2b018f3eed49e44c4c5b4585a7d47b33d51.png' />
                    </div>
                    <div className='box2'>
                      <FiUser /> {item.name}
                    </div>
                    <div className='box4'>
                      <FiPhoneOutgoing /> {item.phone}
                    </div>
                    <div className='box3'>
                      <FiMessageCircle />
                      <FiEdit />
                    </div>
                  </ContainerCard>
                ))}
                <Pagination>
                  {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>
                      <h4>Anterior</h4>
                    </button>
                  )}
                  {renderPageNumbers()}
                  {currentPage < Math.ceil(contacts.length / itemsPerPage) && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>
                      <h4>Próximo</h4>
                    </button>
                  )}
                </Pagination>
              </div>
            )}


          </MainPanel>
        </Content>
      </main>
    </Container>
  );
}