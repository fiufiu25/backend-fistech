import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { Categoria } from 'src/categoria/entities/categoria.entity';

@Injectable()
export class ProductoService {
  constructor(@InjectRepository(Producto) private readonly productoRepository:Repository<Producto>,
  @InjectRepository(Categoria) private readonly categoriaRepository:Repository<Categoria>
){}
  async create(createProductoDto: CreateProductoDto) {
    const categoria= await this.categoriaRepository.findOneBy({nombre:createProductoDto.categoria})
    if(!categoria){
      throw new BadRequestException("categoria equivocada")
    }
   
    const producto= await this.productoRepository.create({nombre:createProductoDto.nombre,precio:createProductoDto.precio,estado:createProductoDto.estado,catidadStock:createProductoDto.cantidadStock,unidad_medida:createProductoDto.unidad_medida,categoria})
     return await this.productoRepository.save(producto)
  }

  async findAll() {
    return  await this.productoRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const  producto= await this.productoRepository.findOneBy({id:id})
    if(!producto){
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }
    const categoria=await this.categoriaRepository.findOneBy({nombre:updateProductoDto.categoria})
    if(!categoria ){
      throw new NotFoundException("la categoria no existe");
    }
     await this.productoRepository.update(id,{nombre:updateProductoDto.nombre,precio:updateProductoDto.precio ,categoria});
  return producto.categoria
    }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
